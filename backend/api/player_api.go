package api

import (
	"cf-apiserver/db/models"
	"cf-apiserver/db/services"

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
		player.GET("/:matchID", f.GetPlayerMatchStats)
	}
}

type PlayerStatsParams struct {
	MatchID uint `uri:"matchID" binding:"required"`
}

func (f *PlayerFeature) GetPlayerMatchStats(c *gin.Context) {
	var params PlayerStatsParams
	if err := c.ShouldBindUri(&params); err != nil {
		c.JSON(400, gin.H{"error": "invalid params"})
		return
	}

	matchID := params.MatchID

	player, err := services.PlayerMatchStats(f.db, uint(matchID))
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"player": player})
}