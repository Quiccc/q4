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
		c.JSON(404, gin.H{"error": "No users found"})
	}

	if result.Error != nil {
		c.JSON(500, gin.H{"error": result.Error})
	}

	c.JSON(200, users)
}

func GetUserById(c *gin.Context, id string) {

	db := initializers.DatabaseConnection()
	var user model.User

	userId, _ := strconv.Atoi(id)

	result := db.First(&user, userId)

	if result.RowsAffected == 0 {
		c.JSON(404, gin.H{"error": "User not found"})
		return
	}

	if result.Error != nil {
		c.JSON(500, gin.H{"error": result.Error})
		return
	}

	c.JSON(200, user)
}

func CreateUser(c *gin.Context, firstName string, lastName string, email string, address string, phone string, position string) {
	user := model.User{
		FirstName: firstName,
		LastName:  lastName,
		Email:     email,
		Address:   address,
		Phone:     phone,
		Position:  position,
	}

	db := initializers.DatabaseConnection()
	result := db.Create(&user)

	if result.Error != nil {
		c.JSON(500, gin.H{"error": result.Error})
		return
	}

	c.JSON(200, user)
}

func UpdateUser(c *gin.Context, id string, firstName string, lastName string, email string, address string, phone string, position string) {

	db := initializers.DatabaseConnection()
	var user model.User
	oldUser := db.First(&user, id)

	if oldUser.RowsAffected == 0 {
		c.JSON(404, gin.H{"error": "User not found"})
		return
	}

	user.FirstName = firstName
	user.LastName = lastName
	user.Email = email
	user.Address = address
	user.Phone = phone
	user.Position = position

	result := db.Save(&user)

	if result.Error != nil {
		c.JSON(500, gin.H{"error": result.Error})
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
		c.JSON(404, gin.H{"error": "User(s) not found"})
		return
	}

	if deletedUsers.Error != nil {
		c.JSON(500, gin.H{"error": deletedUsers.Error})
		return
	}

	db.Delete(&users, ids)

	c.JSON(200, gin.H{"message": "User deleted"})
}
