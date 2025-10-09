package models

import "gorm.io/gorm"

type Team struct {
	gorm.Model
	Name     string `json:"name"`
	TeamLogo string `json:"team_logo"`
	FaceitID string `json:"faceit_id"`
}

type TournamentTeam struct {
	gorm.Model
	TournamentID uint `json:"tournament_id"`
	Tournament Tournament `json:"tournament"`
	TeamID uint `json:"team_id"`
	Team Team `json:"team"`
	Seed uint `json:"seed"`
	Wins uint `json:"wins"`
	Losses uint `json:"losses"`
	Paid bool `json:"paid"`
	SignedUp bool `json:"signed_up"`
}