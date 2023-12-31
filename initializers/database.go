package initializers

import (
	"log"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func DatabaseConnection() *gorm.DB{
	var err error
	db, err := gorm.Open(sqlite.Open("q4.db"), &gorm.Config{})

	if err != nil {
		log.Fatal("Error connecting to database")
	}
	
	return db
}
