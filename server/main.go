package main

import (
	"fill-labs/q4/server/controller"
	"fill-labs/q4/server/initializers"

	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.DatabaseConnection()
}

func setupRouter() *gin.Engine {
	r := gin.Default()

	r.GET("/api/get-users", controller.GetAllUsers)

	r.GET("/api/get-user", func(c *gin.Context) {
		id := c.Query("id")
		controller.GetUserById(c, id)
	})

	r.POST("/api/create-user", func(c *gin.Context){
		firstName := c.Query("firstName")
		lastName := c.Query("lastName")
		email := c.Query("email")
		address := c.Query("address")
		phone := c.Query("phone")
		position := c.Query("position")
		controller.CreateUser(c, firstName, lastName, email, address, phone, position)
	})

	r.PUT("/api/update-user", func(c *gin.Context){
		id := c.Query("id")
		firstName := c.Query("firstName")
		lastName := c.Query("lastName")
		email := c.Query("email")
		address := c.Query("address")
		phone := c.Query("phone")
		position := c.Query("position")
		controller.UpdateUser(c, id, firstName, lastName, email, address, phone, position)
	})

	r.DELETE("/api/delete-user", func(c *gin.Context){
		id := c.Query("id")
		controller.DeleteUser(c, id)
	})

	return r
}

func main() {
	r := setupRouter()
	// Listen and Server in 0.0.0.0:8080
	r.Run()
}
