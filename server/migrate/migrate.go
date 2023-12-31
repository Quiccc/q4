package main

import (
	"fill-labs/q4/server/initializers"
	"fill-labs/q4/server/model"
)

func main() {
	db := initializers.DatabaseConnection()
	db.AutoMigrate(&model.User{})
}