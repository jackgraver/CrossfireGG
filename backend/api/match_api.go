package api

import (
	"cf-apiserver/db/models"
	"cf-apiserver/db/services"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type MatchFeature struct {
	*BaseFeature[models.Match]
}

func NewMatchFeature(db *gorm.DB) *MatchFeature {
	return &MatchFeature{BaseFeature: &BaseFeature[models.Match]{db}}
}

func (f *MatchFeature) DefineMatchRoutes(router *gin.Engine) {
	f.BaseFeature.DefineRoutes(router)

	match := router.Group("/match")
	{
		match.POST("/refresh", f.postRefresh)
		match.GET("/:id/casters", f.getCasters)
		match.POST("/:id/claim", f.postClaim)
		match.POST("/:id/unclaim", f.postUnclaim)
	}
}

func (f *MatchFeature) postRefresh(c *gin.Context) {

}

func (f *MatchFeature) getCasters(c *gin.Context) {

}

func (f *MatchFeature) postClaim(c *gin.Context) {
	matchID, err := strconv.ParseUint(c.Param("id"), 10, 0)
	if err != nil {
		c.JSON(400, gin.H{"error": "invalid id"})
		return
	}

	var body struct {
		CasterID uint `json:"caster_id"`
	}
	if err := c.BindJSON(&body); err != nil {
		c.JSON(400, gin.H{"error": "invalid body"})
		return
	}

	matchCaster := models.MatchCaster{
		MatchID: uint(matchID),
		CasterID: body.CasterID,
	}
	err = services.CreateMatchCaster(f.db, matchCaster)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.Status(204)
}

func (f *MatchFeature) postUnclaim(c *gin.Context) {
	matchID, err := strconv.ParseUint(c.Param("id"), 10, 0)
	if err != nil {
		c.JSON(400, gin.H{"error": "invalid id"})
		return
	}

	var body struct {
		CasterID uint `json:"caster_id"`
	}
	if err := c.BindJSON(&body); err != nil {
		c.JSON(400, gin.H{"error": "invalid body"})
		return
	}

	matchCaster := models.MatchCaster{
		MatchID: uint(matchID),
		CasterID: body.CasterID,
	}
	err = services.RemoveMatchCaster(f.db, matchCaster)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.Status(204)
}