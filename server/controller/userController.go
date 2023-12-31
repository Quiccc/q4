package controller

import (
	"github.com/gin-gonic/gin"
)

func GetAllUsers(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "pong",
	})
}

func GetUserById(){

}

func CreateUser() {

}

func UpdateUser(){

}

func DeleteUser(){

}