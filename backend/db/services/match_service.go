package services

import (
	"cf-apiserver/db/models"

	"gorm.io/gorm"
)

func MatchCasters(db *gorm.DB, matchID string) (models.Match, error) {
	var match models.Match

	err := db.
		Preload("Casters").
		Where("id = ?", matchID).
		Where("status = ?", "SCHEDULED").
		Find(match).Error

	if err != nil {
		return models.Match{}, err
	}

	return match, nil
}

func AllMatchCasters(db *gorm.DB) ([]models.Match, error) {
	var matches []models.Match

	err := db.
		Preload("Casters").
		Where("status = ?", "SCHEDULED").
		Find(&matches).Error

	if err != nil {
		return nil, err
	}

	return matches, nil
}

func CreateMatchCaster(db *gorm.DB, matchCaster models.MatchCaster) error {
	return db.Create(&matchCaster).Error
}

func RemoveMatchCaster(db *gorm.DB, matchCaster models.MatchCaster) error {
	return db.Delete(&matchCaster).Error
}