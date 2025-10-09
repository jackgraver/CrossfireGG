package models

import (
	"time"

	"gorm.io/gorm"
)

//TODO: Status ENUM?
type Match struct {
	gorm.Model
	GroupID uint `json:"group_id"`
	Group Group `json:"group"`
	Round string `json:"round"`
	Status string `json:"status"`
	ScheduledAt time.Time `gorm:"type:date" json:"scheduled_at"`
	FaceitURL string `json:"faceit_url"`
	Participants []MatchParticipant `json:"participants"`
	Casters []MatchCaster `json:"casters"`
}

type MatchParticipant struct {
	gorm.Model
	MatchID uint `json:"match_id"`
	Match Match `json:"match"`
	TeamID uint `json:"team_id"`
	Team Team `json:"team"`
	Winner uint `json:"winner"`
}

type Map struct {
	gorm.Model
	MatchID uint `json:"match_id"`
	Match Match `json:"match"`
	MapName string `json:"map_name"`
	Round string `json:"round"`
	WinnerID uint `json:"winner_id"`
	Winner MatchParticipant `json:"winner"`
	Team1Score uint `json:"team1_score"`
	Team2Score uint `json:"team2_score"`
}

type MatchCaster struct {
	gorm.Model
	MatchID  uint `json:"match_id"`
	Match    Match `json:"match"`
	CasterID uint `json:"caster_id"`
	Caster   User `gorm:"foreignKey:CasterID" json:"caster"`
	AssignedAt time.Time `gorm:"type:date" json:"assigned_at"`
}