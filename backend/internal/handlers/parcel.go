package handlers

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"

	"hypertrace/internal/models"
)

// Move the slice to the package level so both GET and POST can access it.
// Note: In a real app, this would be a database! This resets if you restart the Go server.
var parcels = []models.Parcel{
	{
		ID:                "HTC-89012",
		SenderName:        "John Doe",
		ReceiverName:      "Alice Johnson",
		Status:            "In Transit",
		Origin:            "New York, NY",
		Destination:       "Los Angeles, CA",
		EstimatedDelivery: "Oct 26, 2024",
	},
	{
		ID:                "HTC-78432",
		SenderName:        "John Doe",
		ReceiverName:      "Bob Smith",
		Status:            "Delivered",
		Origin:            "Chicago, IL",
		Destination:       "Miami, FL",
		EstimatedDelivery: "Oct 23, 2024",
	},
}

// GetAllParcels returns a list of parcels
func GetAllParcels(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(parcels)
}

// CreateParcel creates a new parcel and adds it to our slice
func CreateParcel(w http.ResponseWriter, r *http.Request) {
	var newParcel models.Parcel

	// 1. Decode the JSON from the React request body into our struct
	err := json.NewDecoder(r.Body).Decode(&newParcel)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// 2. Generate a random tracking ID (e.g., HTC-12345)
	newParcel.ID = fmt.Sprintf("HTC-%d", rand.Intn(90000)+10000)

	// 3. Set default status for a new shipment
	newParcel.Status = "Pending Pickup"

	// 4. Add the new parcel to our in-memory slice
	parcels = append(parcels, newParcel)

	// 5. Send back the created parcel with a 201 Created status
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newParcel)
}
