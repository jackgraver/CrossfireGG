package api

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type PlayerFeature struct {
	db *gorm.DB
}

func (f *PlayerFeature) DefinePlayerRoutes(router *gin.Engine) {
	player := router.Group("/player")
	{
		player.GET("/all", f.getAll)
		player.GET("/:id", f.getByID)
	}
}

func (f *PlayerFeature) getAll(c *gin.Context) {

}

func (f *PlayerFeature) getByID(c *gin.Context) {	

}