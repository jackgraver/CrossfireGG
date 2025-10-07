package services

import (
	"cf-apiserver/db/models"

	"gorm.io/gorm"
)

func CreateMatchCaster(db *gorm.DB, matchCaster models.MatchCaster) error {
	return db.Create(&matchCaster).Error
}

func RemoveMatchCaster(db *gorm.DB, matchCaster models.MatchCaster) error {
	return db.Delete(&matchCaster).Error
}