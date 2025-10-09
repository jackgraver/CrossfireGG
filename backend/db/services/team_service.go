package services

import (
	"cf-apiserver/db/models"

	"gorm.io/gorm"
)

func InsertTeam(db *gorm.DB, team models.Team) (*models.Team, error) {
	err := db.Create(&team).Error
	return &team, err
}

func UpdateTeamSeed(db *gorm.DB, teamID string, tournamentID uint, seed int) error {
	return db.Model(&models.Team{}).
		Where("id = ? AND tournament_id = ?", teamID, tournamentID).
		Update("seed", seed).Error
}

func UpdateTeamPaid(db *gorm.DB, teamID string, tournamentID uint, paid bool) error {
	return db.Model(&models.Team{}).
		Where("id = ? AND tournament_id = ?", teamID, tournamentID).
		Update("paid", paid).Error
}

func UpdateTeamSignedUp(db *gorm.DB, teamID string, tournamentID uint, signedUp bool) error {
	return db.Model(&models.Team{}).
		Where("id = ? AND tournament_id = ?", teamID, tournamentID).
		Update("signed_up", signedUp).Error
}

func TestFaceitLink(db *gorm.DB, id string) (string, error) {
	// placeholder logic
	return "ok", nil
}

func CreateTournamentTeam(db *gorm.DB, tournamentTeam models.TournamentTeam) error {
	return db.Create(&tournamentTeam).Error
}

func ReRegisterTeam(db *gorm.DB, id string) (models.Team, error) {
	// var team models.Team
	// err := db.Where("id = ?", id).First(&team).Error
	// if err != nil {
	// 	return models.Team{}, err
	// }
	// team. = false
	// err = db.Save(&team).Error
	// return team, err
	return models.Team{}, nil
}