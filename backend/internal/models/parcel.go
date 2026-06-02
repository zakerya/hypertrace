package models

// Parcel represents a shipment in our system
type Parcel struct {
	ID                string `json:"id"` // e.g., "HTC-89012"
	SenderName        string `json:"sender_name"`
	ReceiverName      string `json:"receiver_name"`
	ReceiverEmail     string `json:"receiver_email"` // For notifications
	Status            string `json:"status"`         // e.g., "Pending", "In Transit", "Delivered"
	Origin            string `json:"origin"`
	Destination       string `json:"destination"`
	CreatedAt         string `json:"created_at"`
	EstimatedDelivery string `json:"estimated_delivery"`
}
