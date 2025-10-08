package api

import (
	"cf-apiserver/config"
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

var API_KEY = config.APIKey
var SECRET = config.SECRET

func CheckAPIKey() gin.HandlerFunc {
	return func(c *gin.Context) {
		apiKey := c.GetHeader("X-API-Key")
		if apiKey == "" || apiKey != API_KEY {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "missing or invalid API key"})
			c.Abort()
			return
		}
		c.Next()
	}
}

func ProcessJWT() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")
		if tokenString == "" {
			c.Next() // no token, continue unauthenticated
			return
		}

		// Example for "Authorization: Bearer <token>"
		parts := strings.Split(tokenString, " ")
		if len(parts) == 2 && parts[0] == "Bearer" {
			tokenString = parts[1]
		}

		// Parse and validate token
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return []byte(SECRET), nil
		})

		if err == nil && token.Valid {
			c.Set("user", token.Claims)
		}

		// Even if invalid or missing, continue
		c.Next()
	}
}

func CheckUser(c *gin.Context) gin.HandlerFunc {
	return func(c *gin.Context) {
		if _, exists := c.Get("user"); !exists {
			c.JSON(http.StatusForbidden, gin.H{"error": "authentication required"})
			c.Abort()
			return
		}
		c.Next()
	}
}