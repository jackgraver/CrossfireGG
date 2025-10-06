package api

import (
	"cf-apiserver/db/models"
	"cf-apiserver/db/services"
	"cf-apiserver/utils"

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
	teams, err := services.AllTeams(f.db)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"teams": teams})
}

func (f *TeamFeature) getByID(c *gin.Context) {
	id := c.Param("id")
	team, err := services.GetTeam(f.db, id)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"team": team})
}

func (f *TeamFeature) postSeed(c *gin.Context) {
	id := c.Param("id")

	var body struct {
		TournamentID uint `json:"tournament_id"`
		Seed         int  `json:"seed"`
	}

	if err := c.BindJSON(&body); err != nil {
		c.JSON(400, gin.H{"error": "invalid body"})
		return
	}

	err := services.UpdateTeamSeed(f.db, id, body.TournamentID, body.Seed)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.Status(204)
}

func (f *TeamFeature) postPaid(c *gin.Context) {
	id := c.Param("id")

	var body struct {
		TournamentID uint `json:"tournament_id"`
		Paid         bool `json:"paid"`
	}

	if err := c.BindJSON(&body); err != nil {
		c.JSON(400, gin.H{"error": "invalid body"})
		return
	}

	err := services.UpdateTeamPaid(f.db, id, body.TournamentID, body.Paid)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.Status(204)
}

func (f *TeamFeature) postSignedup(c *gin.Context) {
	id := c.Param("id")

	var body struct {
		TournamentID uint `json:"tournament_id"`
		SignedUp     bool `json:"signed_up"`
	}

	if err := c.BindJSON(&body); err != nil {
		c.JSON(400, gin.H{"error": "invalid body"})
		return
	}

	err := services.UpdateTeamSignedUp(f.db, id, body.TournamentID, body.SignedUp)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.Status(204)
}

func (f *TeamFeature) postTestFaceitLink(c *gin.Context) {

}

func (f *TeamFeature) postRegister(c *gin.Context) {
	var body struct {
		TournamentID uint `json:"tournament_id"`
		FaceitLink   string `json:"faceit_link"`
		TeamName     string `json:"team_name"`
	}
	if err := c.BindJSON(&body); err != nil {
		c.JSON(400, gin.H{"error": "invalid body"})
		return
	}

	faceitID := utils.ExtractIDFromLink(body.FaceitLink)

	existingTeam, err := services.GetTeam(f.db, *faceitID)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	if existingTeam == nil {
		existingTeam, err = services.InsertTeam(f.db , models.Team{
			Name: body.TeamName,
			FaceitID: *faceitID,
		})
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}
	}

	tournamentTeam := models.TournamentTeam {
		TournamentID: body.TournamentID,
		TeamID: existingTeam.ID,
		Seed: 0,
		Wins: 0,
		Losses: 0,
		Paid: false,
		SignedUp: false,
	}

	err = services.CreateTournamentTeam(f.db, tournamentTeam)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	// TODO: players

	c.JSON(200, gin.H{"team": existingTeam})
}

func (f *TeamFeature) postReRegister(c *gin.Context) {	

}