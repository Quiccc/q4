package main

import "fill-labs/q4/initializers"
import "fill-labs/q4/model"

func main() {
	db := initializers.DatabaseConnection()
	db.AutoMigrate(&model.User{})
}