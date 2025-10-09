package db

import "gorm.io/gorm"

var metadataDB *gorm.DB

type Metadata struct {
	Key string `json:"key"`
	Value string `json:"value"`
}

func InitMetadata(db *gorm.DB) {
	metadataDB = db
}

func GetMetadata(key string) (*Metadata, error) {
	var data Metadata
	err := metadataDB.First(&data, "key = ?", key).Error
	if err != nil {
		return nil, err
	}
	return &data, nil
}

func SetMetadata(key string, value string, createOnError bool) {
	data, err := GetMetadata(key)
	if err == nil {
		data.Value = value
		metadataDB.Save(&data)
		return
	} else if createOnError {
		metadataDB.Create(&Metadata{Key: key, Value: value})
		return
	}
}