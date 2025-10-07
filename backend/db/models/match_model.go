package models

import (
	"time"

	"gorm.io/gorm"
)

//TODO: Status ENUM?
type Match struct {
	gorm.Model
	GroupID uint
	Group Group
	Round string
	Status string
	ScheduledAt time.Time `gorm:"type:date"`
	FaceitURL string
	Participants []MatchParticipant
	Casters []MatchCaster
}

type MatchParticipant struct {
	gorm.Model
	MatchID uint
	Match Match
	TeamID uint
	Team Team
	Winner uint
}

type Map struct {
	gorm.Model
	MatchID uint
	Match Match
	MapName string
	Round string
	WinnerID uint
	Winner MatchParticipant
	Team1Score uint
	Team2Score uint
}

type MatchCaster struct {
	gorm.Model
	MatchID  uint
	Match    Match
	CasterID uint 
	Caster   User `gorm:"foreignKey:CasterID"`
	AssignedAt time.Time
}