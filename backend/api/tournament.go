package api

import (
	"cf-apiserver/db/services"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type TournamentFeature struct {
    db *gorm.DB
}

func (f *TournamentFeature) DefineTournamentRoutes(router *gin.Engine) {
    tournament := router.Group("/tournament")
    {
        tournament.GET("/all", f.getAll)
        tournament.POST("/create", f.postCreate)

        current := tournament.Group("/current_tournament")
        {
            current.GET("/all", f.currentTournamentGetAll)
            current.POST("/update", f.currentTournamentPostUpdate)
        }
    }
}

func (f *TournamentFeature) getAll(c *gin.Context) {
    tournaments, err := services.AllTournaments(f.db)
    if err != nil {
        c.JSON(500, gin.H{"error": err.Error()})
        return
    }
    c.JSON(200, gin.H{"tournaments": tournaments})
} 

func (f *TournamentFeature) postCreate(c *gin.Context) {

}

func (f *TournamentFeature) currentTournamentGetAll(c *gin.Context) {

}

func (f *TournamentFeature) currentTournamentPostUpdate(c *gin.Context) {

}