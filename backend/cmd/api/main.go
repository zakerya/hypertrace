// backend/cmd/api/main.go

package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"hypertrace/internal/database"
	"hypertrace/internal/handlers"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"
	"golang.org/x/time/rate"
)

// --- SECURITY MIDDLEWARE: RATE LIMITER ---
var limiter = rate.NewLimiter(5, 10)

func rateLimiterMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if !limiter.Allow() {
			http.Error(w, `{"error": "Too many requests"}`, http.StatusTooManyRequests)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func main() {
	// 1. Load the .env file
	err := godotenv.Load()
	if err != nil {
		log.Println("⚠️ No .env file found, relying on system environment variables")
	}

	// 2. Read environment variables
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	allowedOrigin := os.Getenv("ALLOWED_ORIGIN")
	if allowedOrigin == "" {
		allowedOrigin = "http://localhost:3000"
	}

	// 3. Initialize Database Connection Pool
	ctx := context.Background()
	pool, err := database.NewPool(ctx)
	if err != nil {
		log.Fatalf("❌ Failed to connect to database: %v", err)
	}
	defer pool.Close()

	// 4. Initialize Router
	r := chi.NewRouter()

	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(rateLimiterMiddleware)

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{allowedOrigin},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: true,
	}))

	// 5. Initialize Handlers, passing the database pool
	parcelHandlers := handlers.NewParcelHandler(pool)

	// --- Routes ---
	r.Get("/api/v1/health", handlers.HealthCheck(pool))

	// Use the new handler struct methods
	r.Get("/api/v1/parcels", parcelHandlers.GetAllParcels)
	r.Post("/api/v1/parcels", parcelHandlers.CreateParcel)
	r.Put("/api/v1/parcels/status", parcelHandlers.UpdateParcelStatus)
	r.Get("/api/v1/parcels/{trackingID}", parcelHandlers.GetParcelByID)

	// 6. Create an HTTP Server instance
	srv := &http.Server{
		Addr:    ":" + port,
		Handler: r,
	}

	// 7. Start the server in a Goroutine
	go func() {
		fmt.Printf("🚀 Server starting on http://localhost:%s\n", port)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Error starting server: %v\n", err)
		}
	}()

	// 8. GRACEFUL SHUTDOWN LOGIC
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	sig := <-quit
	log.Printf("🛑 Received signal %v, shutting down gracefully...", sig)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("Server forced to shutdown: %v\n", err)
	}

	log.Println("✅ Server exited gracefully. Goodbye!")
}
