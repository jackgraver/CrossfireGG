package api

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func DefineMatchRoutes(router *gin.Engine, db *gorm.DB) {
	match := router.Group("/match")
	{
		match.GET("/refresh", func(c *gin.Context) {})
		match.GET("/all", func(c *gin.Context) {})
		match.GET("/casters", func(c *gin.Context) {})
		match.GET("/:id", func(c *gin.Context) {})
		match.POST("/claim", func(c *gin.Context) {})
		match.POST("/unclaim", func(c *gin.Context) {})
	}
}
