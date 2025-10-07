package api

import (
	"cf-apiserver/db/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type PlayerFeature struct {
	*BaseFeature[models.Player]
}

func NewPlayerFeature(db *gorm.DB) *PlayerFeature {
	return &PlayerFeature{BaseFeature: &BaseFeature[models.Player]{db}}
}


func (f *PlayerFeature) DefinePlayerRoutes(router *gin.Engine) {
	f.BaseFeature.DefineRoutes(router)

	player := router.Group("/player")
	{
		player.GET("/", func(ctx *gin.Context) {})
	}
}