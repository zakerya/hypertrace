package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"hypertrace/internal/models"
)

// Mock data updated with Status History
var parcels = []models.Parcel{
	{
		ID:                "HTC-89012",
		SenderName:        "John Doe",
		ReceiverName:      "Alice Johnson",
		ReceiverEmail:     "alice@example.com",
		Origin:            "New York, NY",
		Destination:       "Los Angeles, CA",
		EstimatedDelivery: "Oct 26, 2024",
		CurrentStatus:     "Departed Airport",
		StatusHistory: []models.StatusUpdate{
			{Status: "Label Created", Location: "New York, NY", Time: "Oct 22, 2024 09:00 AM"},
			{Status: "Items Packed", Location: "New York, NY", Time: "Oct 22, 2024 11:30 AM"},
			{Status: "Received by Courier", Location: "New York, NY", Time: "Oct 23, 2024 02:00 PM"},
			{Status: "Arrived at Airport", Location: "JFK Airport", Time: "Oct 24, 2024 06:00 AM"},
			{Status: "Departed Airport", Location: "JFK Airport", Time: "Oct 24, 2024 10:00 AM"},
		},
	},
	{
		ID:                "HTC-78432",
		SenderName:        "John Doe",
		ReceiverName:      "Bob Smith",
		ReceiverEmail:     "bob@example.com",
		Origin:            "Chicago, IL",
		Destination:       "Miami, FL",
		EstimatedDelivery: "Oct 23, 2024",
		CurrentStatus:     "Delivered",
		StatusHistory: []models.StatusUpdate{
			{Status: "Label Created", Location: "Chicago, IL", Time: "Oct 20, 2024 10:00 AM"},
			{Status: "Left Sender Facility", Location: "Chicago, IL", Time: "Oct 21, 2024 01:00 PM"},
			{Status: "Out for Delivery", Location: "Miami, FL", Time: "Oct 23, 2024 08:00 AM"},
			{Status: "Delivered", Location: "Miami, FL", Time: "Oct 23, 2024 11:20 AM"},
		},
	},
}

func GetAllParcels(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(parcels)
}

func CreateParcel(w http.ResponseWriter, r *http.Request) {
	var newParcel models.Parcel

	err := json.NewDecoder(r.Body).Decode(&newParcel)
	if err != nil {
		http.Error(w, `{"error": "Invalid request body"}`, http.StatusBadRequest)
		return
	}

	errorMap := models.ValidateStruct(newParcel)
	if errorMap != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnprocessableEntity)
		json.NewEncoder(w).Encode(map[string]interface{}{"errors": errorMap})
		return
	}

	newParcel.ID = fmt.Sprintf("HTC-%d", 90000+10000) // Simple mock ID generation

	// Set the initial status automatically!
	currentTime := time.Now().Format("Jan 02, 2006 03:04 PM")
	newParcel.CurrentStatus = "Label Created"
	newParcel.StatusHistory = []models.StatusUpdate{
		{
			Status:   "Label Created",
			Location: newParcel.Origin,
			Time:     currentTime,
		},
	}

	parcels = append(parcels, newParcel)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newParcel)
}

// NEW: Update a parcel's status
func UpdateParcelStatus(w http.ResponseWriter, r *http.Request) {
	// 1. Get the tracking ID from the URL (e.g., /api/v1/parcels/HTC-89012/status)
	trackingID := r.URL.Query().Get("tracking_id")
	if trackingID == "" {
		http.Error(w, `{"error": "tracking_id query parameter is required"}`, http.StatusBadRequest)
		return
	}

	// 2. Find the parcel in our slice
	var foundParcel *models.Parcel
	var foundIndex int
	for i, p := range parcels {
		if p.ID == trackingID {
			foundParcel = &p
			foundIndex = i
			break
		}
	}

	if foundParcel == nil {
		http.Error(w, `{"error": "Parcel not found"}`, http.StatusNotFound)
		return
	}

	// 3. Decode the incoming status update
	var statusUpdate models.StatusUpdate
	err := json.NewDecoder(r.Body).Decode(&statusUpdate)
	if err != nil {
		http.Error(w, `{"error": "Invalid request body"}`, http.StatusBadRequest)
		return
	}

	if statusUpdate.Status == "" {
		http.Error(w, `{"error": "Status is required"}`, http.StatusBadRequest)
		return
	}

	// 4. Apply the update
	currentTime := time.Now().Format("Jan 02, 2006 03:04 PM")
	statusUpdate.Time = currentTime

	foundParcel.StatusHistory = append(foundParcel.StatusHistory, statusUpdate)
	foundParcel.CurrentStatus = statusUpdate.Status

	// Save back to the slice
	parcels[foundIndex] = *foundParcel

	// 5. Return the updated parcel
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(foundParcel)
}
