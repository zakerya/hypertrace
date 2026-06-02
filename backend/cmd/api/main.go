// backend/cmd/api/main.go

package main

import (
	"fmt"
	"net/http"

	"hypertrace/internal/handlers" // Importing our new handlers!

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"golang.org/x/time/rate" // <-- Added rate limiter import
)

// --- SECURITY MIDDLEWARE: RATE LIMITER ---
// Allows 5 requests per second, with a burst of 10
var limiter = rate.NewLimiter(5, 10)

func rateLimiterMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if !limiter.Allow() {
			http.Error(w, `{"error": "Too many requests"}`, http.StatusTooManyRequests) // 429 status
			return
		}
		next.ServeHTTP(w, r)
	})
}

func main() {
	r := chi.NewRouter()

	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	// Apply the Rate Limiter globally to ALL routes
	r.Use(rateLimiterMiddleware)

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: true,
	}))

	// --- Routes ---

	// Health check route
	r.Get("/api/v1/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status": "ok", "message": "HyperTrace Go backend is alive!"}`))
	})

	// Our NEW Parcels route! Wiring the handler to the URL.
	r.Get("/api/v1/parcels", handlers.GetAllParcels)
	r.Post("/api/v1/parcels", handlers.CreateParcel)

	// Start the server
	port := ":8080"
	fmt.Printf("🚀 Server starting on http://localhost%s\n", port)

	if err := http.ListenAndServe(port, r); err != nil {
		fmt.Printf("Error starting server: %v\n", err)
	}
}
