package api

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func DefineTeamRoutes(router *gin.Engine, db *gorm.DB) {
	team := router.Group("/team")
	{
		team.GET("/all", func(c *gin.Context) {})
		team.GET("/:id", func(c *gin.Context) {})
		team.POST("/:id/seed", func(c *gin.Context) {})
		team.POST("/:id/paid", func(c *gin.Context) {})
		team.POST("/:id/signedup", func(c *gin.Context) {})
		team.POST("/:id/test_faceit_link", func(c *gin.Context) {})
		team.POST("/register", func(c *gin.Context) {})
		team.POST("/re-register", func(c *gin.Context) {})
	}
}