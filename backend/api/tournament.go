package api

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func DefineTournamentRoutes(router *gin.Engine, db *gorm.DB) {
    tournament := router.Group("/tournament")
    {
        tournament.GET("/all", func(c *gin.Context){})
        tournament.POST("/create", func(c *gin.Context){})

        current := tournament.Group("/current_tournament")
        {
            current.GET("/all", func(c *gin.Context){})
            current.POST("/update", func(c *gin.Context){})
        }
    }
}