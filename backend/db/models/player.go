package models

import "gorm.io/gorm"

type Player struct {
	gorm.Model
	PlayerName string
	FaceitID string
	TeamID uint
	Team Team
	PlayerLogo string
}

type PlayerStats struct {
	gorm.Model
	PlayerID uint
	Player Player
	MatchID uint
	Match Match
	MapID uint
	Map Map
	Kills uint
	Deaths uint
	Assists uint
	ADR uint
	Damange uint
}