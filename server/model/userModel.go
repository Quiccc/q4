package model

import "gorm.io/gorm"

type User struct {
	gorm.Model
	FirstName string `gorm:"not null; default:null"`
	LastName  string `gorm:"not null; default:null"`
	Email     string `gorm:"unique; not null; default:null"`
	Address   string `gorm:"not null; default:null"`
	Phone     string `gorm:"unique; not null; default:null"`
	Position  string `gorm:"not null; default:null"`
}
