package api

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type MatchFeature struct {
	db *gorm.DB
}

func (f *MatchFeature) DefineMatchRoutes(router *gin.Engine) {
	match := router.Group("/match")
	{
		match.GET("/all", f.getAll)
		match.GET("/:id", f.getByID)
		match.POST("/refresh", f.postRefresh)
		match.GET("/casters", f.getCasters)
		match.POST("/claim", f.postClaim)
		match.POST("/unclaim", f.postUnclaim)
	}
}

func (f *MatchFeature) postRefresh(c *gin.Context) {

}

func (f *MatchFeature) getAll(c *gin.Context) {

}

func (f *MatchFeature) getByID(c *gin.Context) {

}

func (f *MatchFeature) getCasters(c *gin.Context) {

}

func (f *MatchFeature) postClaim(c *gin.Context) {

}

func (f *MatchFeature) postUnclaim(c *gin.Context) {

}