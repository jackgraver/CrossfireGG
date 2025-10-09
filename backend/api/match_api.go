package api

import (
	"cf-apiserver/db/models"
	"cf-apiserver/db/services"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type MatchFeature struct {
	*BaseFeature[models.Match]
}

func NewMatchFeature(db *gorm.DB) *MatchFeature {
	return &MatchFeature{BaseFeature: &BaseFeature[models.Match]{db, "/match"}}
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

type ClaimingParams struct {
	MatchID uint `uri:"match_id" binding:"required"`
}

func (f *MatchFeature) postClaim(c *gin.Context) {
	var params ClaimingParams
	if err := c.ShouldBindUri(&params); err != nil {
		c.JSON(400, gin.H{"error": "invalid params"})
	}

	var body struct {
		CasterID uint `json:"caster_id"`
	}
	if err := c.BindJSON(&body); err != nil {
		c.JSON(400, gin.H{"error": "invalid body"})
		return
	}

	matchCaster := models.MatchCaster{
		MatchID: params.MatchID,
		CasterID: body.CasterID,
	}
	err := services.CreateMatchCaster(f.db, matchCaster)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.Status(204)
}

func (f *MatchFeature) postUnclaim(c *gin.Context) {
	var params ClaimingParams
	if err := c.ShouldBindUri(&params); err != nil {
		c.JSON(400, gin.H{"error": "invalid params"})
	}

	var body struct {
		CasterID uint `json:"caster_id"`
	}
	if err := c.BindJSON(&body); err != nil {
		c.JSON(400, gin.H{"error": "invalid body"})
		return
	}

	matchCaster := models.MatchCaster{
		MatchID:  params.MatchID,
		CasterID: body.CasterID,
	}
	err := services.RemoveMatchCaster(f.db, matchCaster)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.Status(204)
}