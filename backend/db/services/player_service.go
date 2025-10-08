package services

import (
	"cf-apiserver/db/models"

	"gorm.io/gorm"
)

func PlayerMatchStats(db *gorm.DB, matchID uint) ([]models.PlayerStats, error) {
	var stats []models.PlayerStats

	err := db.
		Preload("Player").
		Preload("Match").
		Preload("Map").
		Where("match_id = ?", matchID).
		Find(&stats).Error

	if err != nil {
		return nil, err
	}

	return stats, nil
}