/*
File Description:
User model file for database migration & controller functions.
*/
package model

import "gorm.io/gorm"

type User struct {
	gorm.Model // This is the base model that contains the ID, CreatedAt, UpdatedAt, and DeletedAt fields.
	FirstName  string `gorm:"not null; default:null"`
	LastName   string `gorm:"not null; default:null"`
	Phone      string `gorm:"unique; not null; default:null"`
	Address    string `gorm:"not null; default:null"`
	Email      string `gorm:"unique; not null; default:null"`
	Title      string `gorm:"not null; default:null"`
}
