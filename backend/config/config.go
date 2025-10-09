package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

var (
    DatabasePassword string
    APIKey           string
	FaceitAPI        string
	SECRET           string
)

func init() {
    err := godotenv.Load("../.env") // optional: relative path
    if err != nil {
        log.Println("No .env file found, relying on environment variables")
    }

    DatabasePassword = os.Getenv("VALID_API_KEY")
    APIKey = os.Getenv("VALID_API_KEY")
	FaceitAPI = os.Getenv("FACEIT_API_KEY")
	SECRET = os.Getenv("JWT_SECRET_KEY")

    if DatabasePassword == "" || APIKey == "" || FaceitAPI == "" || SECRET == "" {
        log.Fatal("required env variables not set")
    }
}
