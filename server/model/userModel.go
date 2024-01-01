package model

import "gorm.io/gorm"

type User struct {
	gorm.Model
	FirstName string
	LastName  string
	Email     string `gorm:"unique"`
	Address   string
	Phone     string `gorm:"unique"`
	Position  string
}