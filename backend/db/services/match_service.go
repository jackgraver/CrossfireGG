package services

import (
	"cf-apiserver/db/models"

	"gorm.io/gorm"
)

func AllMatches(db *gorm.DB) ([]models.Match, error) {
	var matches []models.Match
	err := db.Find(&matches).Error
	if err != nil {
		return nil, err
	}
	return matches, nil
}

func GetMatch(db *gorm.DB, id string) (*models.Match, error) {
	var match models.Match
	err := db.Where("id = ?", id).First(&match).Error
	if err != nil {
		return nil, err
	}
	return &match, nil
}

func CreateMatchCaster(db *gorm.DB, matchCaster models.MatchCaster) error {
	return db.Create(&matchCaster).Error
}

func RemoveMatchCaster(db *gorm.DB, matchCaster models.MatchCaster) error {
	return db.Delete(&matchCaster).Error
}