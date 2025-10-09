package api

import (
	"cf-apiserver/db"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
) 

func InitAPI() {
	router := gin.Default()

	router.Use(CheckAPIKey())
	router.Use(ProcessJWT())

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	router.SetTrustedProxies(nil)

	db, err := db.ConnectToDB()
	if err != nil {
		panic(err)
	}

	matchFeature := NewMatchFeature(db)
	matchFeature.DefineMatchRoutes(router)

	playerFeature := NewPlayerFeature(db)
	playerFeature.DefinePlayerRoutes(router)

	teamFeature := NewTeamFeature(db)
	teamFeature.DefineTeamRoutes(router)

	tournamentFeature := NewTournamentFeature(db)
	tournamentFeature.DefineTournamentRoutes(router)

	router.Run("127.0.0.1:8080")
}