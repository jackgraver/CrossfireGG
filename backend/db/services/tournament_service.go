package services

import (
	"cf-apiserver/db/models"
	"time"

	"gorm.io/gorm"
)

func CreateTournament(db *gorm.DB, tournament models.Tournament) (models.Tournament, error) {
	err := db.Create(&tournament).Error;
	if err != nil {
		return models.Tournament{}, err
	}
	return tournament, nil
}

func CurrentTournament(db *gorm.DB) (models.Tournament, error) {
	var tournament models.Tournament
	today := time.Now()

	err := db.
		Where("start_date <= ? AND end_date >= ?", today, today).
		First(&tournament).Error

	if err != nil {
		return models.Tournament{}, err
	}
	return tournament, nil
}