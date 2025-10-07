package api

import (
	"cf-apiserver/db/models"

	"github.com/gin-gonic/gin"
)

type PlayerFeature struct {
	*BaseFeature[models.Player]
}

func (f *PlayerFeature) DefinePlayerRoutes(router *gin.Engine) {
	f.BaseFeature.DefineRoutes(router)

	player := router.Group("/player")
	{
		player.GET("/", func(ctx *gin.Context) {})
	}
}