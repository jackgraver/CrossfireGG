package models

import (
	"time"

	"gorm.io/gorm"
)

type Scheduled struct {
	StartDate time.Time `gorm:"type:date"`
	EndDate time.Time `gorm:"type:date"`
}

type Tournament struct {
	gorm.Model
	Name string
	Scheduled Scheduled `gorm:"embedded"`
	FaceitID string
	Teams []TournamentTeam
	Stages []Stage
}

type CreateTournament struct {
	TournamentName string `json:"tournament_name"`
	Scheduled Scheduled `json:"scheduled"`
	FaceitID string `json:"faceit_id"`
}

type Stage struct {
	gorm.Model
	TournamentID uint
	Tournament Tournament
	Name string
	Format string
	IsCurrent    bool 
	Scheduled Scheduled `gorm:"embedded"`
	Groups []Group
}

type Group struct {
	gorm.Model
	Name string
	StageID uint
	Stage Stage
	Matches []Match
}

// type SubTournament struct {
	
// }