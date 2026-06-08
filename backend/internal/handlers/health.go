// backend/internal/handlers/health.go

package handlers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

type SubCheck struct {
	Name    string  `json:"name"`
	Status  string  `json:"status"`
	Latency float64 `json:"latency"`
}

type HealthResponse struct {
	Status    string     `json:"status"`
	SubChecks []SubCheck `json:"subChecks"`
}

func HealthCheck(pool *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		var subChecks []SubCheck
		overallStatus := "online"

		// 1. Check Database Connection
		start := time.Now()
		err := pool.Ping(r.Context())
		latency := time.Since(start).Milliseconds()

		if err != nil {
			subChecks = append(subChecks, SubCheck{Name: "Database Connection", Status: "offline", Latency: float64(latency)})
			overallStatus = "offline"
		} else {
			subChecks = append(subChecks, SubCheck{Name: "Database Connection", Status: "online", Latency: float64(latency)})

			// 2. Check Read/Pull Operations
			start = time.Now()
			var n int
			err := pool.QueryRow(r.Context(), "SELECT 1").Scan(&n)
			latency = time.Since(start).Milliseconds()

			if err != nil {
				subChecks = append(subChecks, SubCheck{Name: "Pulling Data (Read)", Status: "offline", Latency: float64(latency)})
				overallStatus = "offline"
			} else {
				subChecks = append(subChecks, SubCheck{Name: "Pulling Data (Read)", Status: "online", Latency: float64(latency)})
			}

			// 3. Check Write/Save/Record Operations
			start = time.Now()
			// We use a temporary table to test write permissions without polluting your real data
			_, err = pool.Exec(r.Context(), "CREATE TEMP TABLE IF NOT EXISTS health_check_write (id int); INSERT INTO health_check_write (id) VALUES (1); DROP TABLE health_check_write;")
			latency = time.Since(start).Milliseconds()

			if err != nil {
				subChecks = append(subChecks, SubCheck{Name: "Recording & Saving Data (Write)", Status: "offline", Latency: float64(latency)})
				overallStatus = "offline"
			} else {
				subChecks = append(subChecks, SubCheck{Name: "Recording & Saving Data (Write)", Status: "online", Latency: float64(latency)})
			}
		}

		res := HealthResponse{
			Status:    overallStatus,
			SubChecks: subChecks,
		}

		if overallStatus == "offline" {
			w.WriteHeader(http.StatusServiceUnavailable)
		} else {
			w.WriteHeader(http.StatusOK)
		}

		json.NewEncoder(w).Encode(res)
	}
}
