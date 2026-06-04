package models

import "github.com/go-playground/validator/v10"

// StatusUpdate represents a single point in time for the parcel's journey
type StatusUpdate struct {
	Status   string `json:"status"`
	Location string `json:"location,omitempty"` // e.g., "JFK Airport", "New York Hub"
	Time     string `json:"time"`
}

// Parcel represents a shipment in our system
type Parcel struct {
	ID                string         `json:"id"`
	SenderName        string         `json:"sender_name" validate:"required,min=2,max=100"`
	ReceiverName      string         `json:"receiver_name" validate:"required,min=2,max=100"`
	ReceiverEmail     string         `json:"receiver_email" validate:"required,email"`
	Origin            string         `json:"origin" validate:"required,min=2,max=100"`
	Destination       string         `json:"destination" validate:"required,min=2,max=100"`
	EstimatedDelivery string         `json:"estimated_delivery" validate:"required"`
	CurrentStatus     string         `json:"current_status"` // The latest status for quick filtering
	StatusHistory     []StatusUpdate `json:"status_history"` // The full timeline!
}

var validate *validator.Validate

func init() {
	validate = validator.New()
}

func ValidateStruct(p Parcel) map[string]string {
	errs := validate.Struct(p)
	if errs == nil {
		return nil
	}

	errorMap := make(map[string]string)
	for _, err := range errs.(validator.ValidationErrors) {
		field := err.Field()
		switch err.Tag() {
		case "required":
			errorMap[field] = field + " is required"
		case "email":
			errorMap[field] = field + " must be a valid email"
		case "min":
			errorMap[field] = field + " must be at least " + err.Param() + " characters"
		default:
			errorMap[field] = field + " failed on " + err.Tag()
		}
	}
	return errorMap
}
