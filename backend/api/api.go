package api

import (
	"cf-apiserver/db"
	"fmt"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func InitAPI() {
	router := gin.Default()

	router.Use(globalMiddleware())

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

	matchFeature := MatchFeature{db}
	matchFeature.DefineMatchRoutes(router)

	playerFeature := PlayerFeature{db}
	playerFeature.DefinePlayerRoutes(router)

	teamFeature := TeamFeature{db}
	teamFeature.DefineTeamRoutes(router)

	tournamentFeature := TournamentFeature{db}
	tournamentFeature.DefineTournamentRoutes(router)

	router.Run("127.0.0.1:8080")
}

func globalMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		fmt.Println("Middleware pre-setup")
		c.Next();
	}
}