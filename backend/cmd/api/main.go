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

	// 3. Initialize Router
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

	// --- Routes ---
	r.Get("/api/v1/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status": "ok", "message": "HyperTrace Go backend is alive!"}`))
	})

	r.Get("/api/v1/parcels", handlers.GetAllParcels)
	r.Post("/api/v1/parcels", handlers.CreateParcel)
	r.Put("/api/v1/parcels/status", handlers.UpdateParcelStatus)

	// 4. Create an HTTP Server instance
	srv := &http.Server{
		Addr:    ":" + port,
		Handler: r,
	}

	// 5. Start the server in a Goroutine so it doesn't block the shutdown listener
	go func() {
		fmt.Printf("🚀 Server starting on http://localhost:%s\n", port)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Error starting server: %v\n", err)
		}
	}()

	// 6. GRACEFUL SHUTDOWN LOGIC
	// Create a channel to listen for OS interrupt signals (Ctrl+C)
	quit := make(chan os.Signal, 1)
	// syscall.SIGINT = Ctrl+C, syscall.SIGTERM = Kill command
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	// Block the main thread until a signal is received
	sig := <-quit
	log.Printf("🛑 Received signal %v, shutting down gracefully...", sig)

	// Give the server 10 seconds to finish processing active requests
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("Server forced to shutdown: %v\n", err)
	}

	log.Println("✅ Server exited gracefully. Goodbye!")
}
