package services

import (
	"cf-apiserver/db/models"
	"time"

	"gorm.io/gorm"
)

func AllTournaments(db *gorm.DB) ([]models.Tournament, error) {
	var tournaments []models.Tournament
	err := db.Find(&tournaments).Error
	if err != nil {
		return nil, err
	}
	return tournaments, nil
}

func GetTournament(db *gorm.DB, id string) (*models.Tournament, error) {
	var tournament models.Tournament
	err := db.Where("id = ?", id).First(&tournament).Error
	if err != nil {
		return nil, err
	}
	return &tournament, nil
}

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