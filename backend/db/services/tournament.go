package services

import (
	"cf-apiserver/db/models"

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

func CreateTournament(db *gorm.DB, tournament models.Tournament) (models.Tournament, error) {
	err := db.Create(&tournament).Error;
	if err != nil {
		return models.Tournament{}, err
	}
	return tournament, nil
}