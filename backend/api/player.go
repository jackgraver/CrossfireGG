package api

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func DefinePlayerRoutes(router *gin.Engine, db *gorm.DB) {
	player := router.Group("/player")
	{
		player.GET("/all", func(c *gin.Context) {})
		player.GET("/:id", func(c *gin.Context) {})
	}
}