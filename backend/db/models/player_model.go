package models

import "gorm.io/gorm"

type Player struct {
	gorm.Model
	PlayerName string `json:"player_name"`
	FaceitID string `json:"faceit_id"`
	TeamID uint `json:"team_id"`
	Team Team `json:"team"`
	PlayerLogo string `json:"player_logo"`
}

type PlayerStats struct {
	gorm.Model
	PlayerID uint `json:"player_id"`
	Player Player `json:"player"`
	MatchID uint `json:"match_id"`
	Match Match `json:"match"`
	MapID uint `json:"map_id"`
	Map Map `json:"map"`
	Kills uint `json:"kills"`
	Deaths uint `json:"deaths"`
	Assists uint `json:"assists"`
	ADR uint `json:"adr"`
	Damange uint `json:"damage"`
}