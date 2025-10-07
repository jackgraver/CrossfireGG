package api

import (
	"cf-apiserver/db/models"
	"cf-apiserver/db/services"
	"net/http"
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
		match.GET("/:id/casters", f.getMatchCasters)
		match.GET("/casters", f.getAllMatchesCasters)
		match.POST("/:id/claim", f.postClaim)
		match.POST("/:id/unclaim", f.postUnclaim)
	}
}

func (f *MatchFeature) postRefresh(c *gin.Context) {

}

func (f *MatchFeature) getMatchCasters(c *gin.Context) {
	id := c.Param("id")
	casters, err := services.MatchCasters(f.db, id)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"casters": casters})
}

func (f *MatchFeature) getAllMatchesCasters(c *gin.Context) {
	matches, err := services.AllMatchCasters(f.db)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"matches": matches})
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