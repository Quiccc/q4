package controller

import (
	"fill-labs/q4/server/initializers"
	"fill-labs/q4/server/model"
	"strconv"
	s "strings"

	"github.com/gin-gonic/gin"
)

func GetAllUsers(c *gin.Context) {

	db := initializers.DatabaseConnection()
	var users []model.User
	result := db.Find(&users)

	if result.RowsAffected == 0 {
		c.AbortWithStatus(404)
	}

	if result.Error != nil {
		c.AbortWithStatus(500)
	}

	c.JSON(200, users)
}

func GetUserById(c *gin.Context, id string) {

	db := initializers.DatabaseConnection()
	var user model.User

	userId, _ := strconv.Atoi(id)

	result := db.First(&user, userId)

	if result.RowsAffected == 0 {
		c.AbortWithStatus(404)
		return
	}

	if result.Error != nil {
		c.AbortWithStatus(500)
		return
	}

	c.JSON(200, user)
}

func CreateUser(c *gin.Context, firstName string, lastName string, email string, address string, phone string, title string) {
	user := model.User{
		FirstName: firstName,
		LastName:  lastName,
		Email:     email,
		Address:   address,
		Phone:     phone,
		Title:  title,
	}

	db := initializers.DatabaseConnection()
	result := db.Create(&user)

	if result.Error != nil {
		uniquenessError := s.Split(result.Error.Error(), " ")

		if uniquenessError[3] == "users.email" || uniquenessError[3] == "users.phone" {
			c.JSON(500, gin.H{"error": uniquenessError[3]})
			return
		}

		c.JSON(500, gin.H{"error": "Unexpected"})
		return
	}

	c.JSON(200, user)
}

func UpdateUser(c *gin.Context, id string, firstName string, lastName string, email string, address string, phone string, title string) {

	db := initializers.DatabaseConnection()
	var user model.User
	oldUser := db.First(&user, id)

	if oldUser.RowsAffected == 0 {
		c.AbortWithStatus(404)
		return
	}

	user.FirstName = firstName
	user.LastName = lastName
	user.Email = email
	user.Address = address
	user.Phone = phone
	user.Title = title

	result := db.Save(&user)

	if result.Error != nil {
		uniquenessError := s.Split(result.Error.Error(), " ")

		if uniquenessError[3] == "users.email" || uniquenessError[3] == "users.phone" {
			c.JSON(500, gin.H{"error": uniquenessError[3]})
			return
		}

		c.JSON(500, gin.H{"error": "Unexpected"})
		return
	}

	c.JSON(200, "User updated")
}

func DeleteUsers(c *gin.Context, idStr string) {
	db := initializers.DatabaseConnection()

	ids := s.Split(idStr, " ")
	var users []model.User
	deletedUsers := db.Find(&users, ids)

	if deletedUsers.RowsAffected == 0 {
		c.AbortWithStatus(404)
		return
	}

	if deletedUsers.Error != nil {
		c.AbortWithStatus(500)
		return
	}

	db.Delete(&users, ids)

	c.AbortWithStatus(200)
}
