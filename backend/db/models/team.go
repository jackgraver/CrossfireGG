package models

import "gorm.io/gorm"

type Team struct {
	gorm.Model
	Name     string
	TeamLogo string
	FaceitID string
}

type TournamentTeam struct {
	gorm.Model
	TournamentID uint
	Tournament Tournament
	TeamID uint
	Team Team
	Seed uint
	Wins uint
	Losses uint
	Paid bool
	SignedUp bool
}