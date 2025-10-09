package services

import (
	"gorm.io/gorm"
)

func AllObjects[T any] (db *gorm.DB) ([]T, error) {
	var result []T
	err := db.Find(&result).Error
	if err != nil {
		return nil, err
	}
	return result, nil
}

func GetObject[T any] (db *gorm.DB, id string) (*T, error) {
	var result T
	err := db.Where("id = ?", id).First(&result).Error
	if err != nil {
		return nil, err
	}
	return &result, nil
}