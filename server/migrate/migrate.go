/*
File Description:
Database migration file.
*/
package main

import (
	"fill-labs/q4/server/initializers"
	"fill-labs/q4/server/model"
)

/*
Function Description:
Main function for migrate package and handles the database migration.

Returns:
void
*/
func main() {
	db := initializers.DatabaseConnection()
	db.AutoMigrate(&model.User{}) //
}
