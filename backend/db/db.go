package db

import (
	"cf-apiserver/db/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func ConnectToDB() (*gorm.DB, error) {
	dsn := "host=localhost user=postgres password=pass123 dbname=cf-postgres port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	err = migrateMealPlanDatabase(db)
	if err != nil {
		return nil, err
	}

	return db, nil
}

func migrateMealPlanDatabase(db *gorm.DB) error {
	// db.Migrator().DropTable()
	err := db.AutoMigrate(
		&models.Tournament{},
		&models.Stage{},
		&models.Group{},
		&models.Match{},
		&models.Map{},
		&models.MatchParticipant{},
		&models.Team{},
		&models.TournamentTeam{},
		&models.Player{},
		&models.PlayerStats{},
	)
	if err != nil {
		return err
	}
	return nil
}