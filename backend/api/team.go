package api

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type TeamFeature struct {
	db *gorm.DB
}

func (f *TeamFeature) DefineTeamRoutes(router *gin.Engine) {
	team := router.Group("/team")
	{
		team.GET("/all", f.getAll)
		team.GET("/:id", f.getByID)
		team.POST("/:id/seed", f.postSeed)
		team.POST("/:id/paid", f.postPaid)
		team.POST("/:id/signedup", f.postSignedup)
		team.POST("/:id/test_faceit_link", f.postTestFaceitLink)
		team.POST("/register", f.postRegister)
		team.POST("/re-register", f.postReRegister)
	}
}

func (f *TeamFeature) getAll(c *gin.Context) {

}

func (f *TeamFeature) getByID(c *gin.Context) {

}

func (f *TeamFeature) postSeed(c *gin.Context) {

}

func (f *TeamFeature) postPaid(c *gin.Context) {

}

func (f *TeamFeature) postSignedup(c *gin.Context) {

}

func (f *TeamFeature) postTestFaceitLink(c *gin.Context) {

}

func (f *TeamFeature) postRegister(c *gin.Context) {

}	

func (f *TeamFeature) postReRegister(c *gin.Context) {	

}