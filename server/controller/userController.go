/*
Fİle Description:
This file is the API controller for the user model.
HTTP requests, responses & CRUD operations are handled here.
*/
package controller

import (
	"fill-labs/q4/server/initializers"
	"fill-labs/q4/server/model"
	"strconv"
	s "strings"

	"github.com/gin-gonic/gin"
)

/*
Function Description:
This function handles the GET requests to the API.
Fetches all users from the database
sends a response with the appropriate status code and users as a JSON.

Params:
c (*gin.Context): Context of the request.

Returns:
void
*/
func GetAllUsers(c *gin.Context) {

	db := initializers.DatabaseConnection()
	var users []model.User
	result := db.Find(&users)

	//Empty query
	if result.RowsAffected == 0 {
		c.JSON(404, gin.H{"error": "No users found"})
	}

	//Server error
	if result.Error != nil {
		c.JSON(500, gin.H{"error": "Unexpected"})
	}

	//OK and send users as JSON
	c.JSON(200, users)
}

/*
Function Description:
This function handles the GET requests to the API.
Fetches a single user from the database by ID
sends a response with the appropriate status code and the user as a JSON.

Params:
c (*gin.Context): Context of the request.
id (string): ID of the user to be fetched.

Returns:
void
*/
func GetUserById(c *gin.Context, id string) {

	db := initializers.DatabaseConnection()
	var user model.User

	userId, _ := strconv.Atoi(id)

	result := db.First(&user, userId)

	if result.RowsAffected == 0 {
		c.JSON(404, gin.H{"error": "No user found"})
		return
	}

	if result.Error != nil {
		c.JSON(500, gin.H{"error": "Unexpected"})
		return
	}

	c.JSON(200, user)
}

/*
Function Description:
This function handles the POST requests to the API.
Creates a new user in the database with the given parameters.
sends a response with the appropriate status code
depending on the status of the operation
a string is attached for uniqueness check at the client-side.

Params:
c (*gin.Context): Context of the request.
firstName (string): First name of the user to be created.
lastName (string): Last name of the user to be created.
email (string): Email of the user to be created.
address (string): Address of the user to be created.
phone (string): Phone of the user to be created.
title (string): Title of the user to be created.

Returns:
void
*/
func CreateUser(c *gin.Context, firstName string, lastName string, email string, address string, phone string, title string) {
	//User modal instance
	user := model.User{
		FirstName: firstName,
		LastName:  lastName,
		Email:     email,
		Address:   address,
		Phone:     phone,
		Title:     title,
	}

	db := initializers.DatabaseConnection()
	result := db.Create(&user)

	//Status: 500 Handling
	if result.Error != nil {

		//Unique constraint error handling
		uniquenessError := s.Split(result.Error.Error(), " ")
		if uniquenessError[3] == "users.email" || uniquenessError[3] == "users.phone" {
			c.JSON(500, gin.H{"error": uniquenessError[3]})
			return
		}

		if result.RowsAffected == 0 {
			c.JSON(404, gin.H{"error": "Table not found."})
			return
		}

		//Server error
		c.JSON(500, gin.H{"error": "Unexpected"})
		return
	}

	//OK
	c.JSON(200, user)
}

/*
Function Description:
This function handles the PUT requests to the API.
Updates a user in the database with the given parameters.
sends a response with the appropriate status code
depending on the status of the operation
a string is attached for uniqueness check at the client-side.

Params:
c (*gin.Context): Context of the request.
id (string): ID of the user to be updated.
firstName (string): First name of the user to be updated.
lastName (string): Last name of the user to be updated.
email (string): Email of the user to be updated.
address (string): Address of the user to be updated.
phone (string): Phone of the user to be updated.
title (string): Title of the user to be updated.

Returns:
void
*/
func UpdateUser(c *gin.Context, id string, firstName string, lastName string, email string, address string, phone string, title string) {

	db := initializers.DatabaseConnection()
	var user model.User
	oldUser := db.First(&user, id)

	//Empty query
	if oldUser.RowsAffected == 0 {
		c.JSON(404, gin.H{"error": "No user found"})
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
		//Unique constraint error handling
		uniquenessError := s.Split(result.Error.Error(), " ")
		if uniquenessError[3] == "users.email" || uniquenessError[3] == "users.phone" {
			c.JSON(500, gin.H{"error": uniquenessError[3]})
			return
		}

		//Server error
		c.JSON(500, gin.H{"error": "Unexpected"})
		return
	}

	//OK
	c.JSON(200, user)
}

/*
Function Description:
This function handles the DELETE requests to the API.
Deletes a user in the database with the given parameters.
sends a response with the appropriate status code
depending on the input, either a single user or multiple users are deleted.

Params:
c (*gin.Context): Context of the request.
idStr (string): ID(s) of the user(s) to be deleted.

Returns:
void
*/
func DeleteUsers(c *gin.Context, idStr string) {
	db := initializers.DatabaseConnection()

	ids := s.Split(idStr, " ")
	var users []model.User
	deletedUsers := db.Find(&users, ids)

	//Empty query
	if deletedUsers.RowsAffected == 0 {
		c.JSON(404, gin.H{"error": "No user(s) found"})
		return
	}

	//Server error
	if deletedUsers.Error != nil {
		c.JSON(500, gin.H{"error": "Unexpected"})
		return
	}

	db.Delete(&users, ids) // Delete single or multiple users depending on the input.length

	//OK
	c.JSON(200, strconv.FormatInt(deletedUsers.RowsAffected, 10)+" User(s) deleted")
}
