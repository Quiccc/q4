/*
File Description:
Database connection initializer file.
*/
package initializers

import (
	"log"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

/*
Function Description:
This function establishes a connection to the database.

Returns:
db (*gorm.DB): Database instance.
*/
func DatabaseConnection() *gorm.DB{
	var err error
	db, err := gorm.Open(sqlite.Open("q4.db"), &gorm.Config{})

	if err != nil {
		log.Fatal("Error connecting to database")
	}
	
	return db
}
