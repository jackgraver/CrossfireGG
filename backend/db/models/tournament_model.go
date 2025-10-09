package models

import (
	"time"

	"gorm.io/gorm"
)

type Scheduled struct {
	StartDate time.Time `gorm:"type:date" json:"start_date"`
	EndDate time.Time `gorm:"type:date" json:"end_date"`
}

type Tournament struct {
	gorm.Model
	Name string `json:"name"`
	Scheduled Scheduled `gorm:"embedded"`
	FaceitID string `json:"faceit_id"`
	Teams []TournamentTeam `json:"teams"`
	Stages []Stage `json:"stages"`
}

type CreateTournament struct {
	TournamentName string `json:"tournament_name"`
	Scheduled Scheduled `json:"scheduled"`
	FaceitID string `json:"faceit_id"`
}

type Stage struct {
	gorm.Model
	TournamentID uint `json:"tournament_id"`
	Tournament Tournament `json:"tournament"`
	Name string `json:"name"`
	Format string `json:"format"`
	IsCurrent    bool `json:"is_current"`
	Scheduled Scheduled `gorm:"embedded"`
	Groups []Group `json:"groups"`
}

type Group struct {
	gorm.Model
	Name string `json:"name"`
	StageID uint `json:"stage_id"`
	Stage Stage `json:"stage"`
	Matches []Match `json:"matches"`
}