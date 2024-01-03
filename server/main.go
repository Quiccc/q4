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

	r.POST("/api/create-user", func(c *gin.Context) {
		firstName := c.Query("firstName")
		lastName := c.Query("lastName")
		email := c.Query("email")
		address := c.Query("address")
		phone := c.Query("phone")
		title := c.Query("title")
		controller.CreateUser(c, firstName, lastName, email, address, phone, title)
	})

	r.PUT("/api/update-user", func(c *gin.Context) {
		id := c.Query("id")
		firstName := c.Query("firstName")
		lastName := c.Query("lastName")
		email := c.Query("email")
		address := c.Query("address")
		phone := c.Query("phone")
		title := c.Query("title")
		controller.UpdateUser(c, id, firstName, lastName, email, address, phone, title)
	})

	r.DELETE("/api/delete-users", func(c *gin.Context) {
		ids := c.Query("ids")
		controller.DeleteUsers(c, ids)
	})

	return r
}

func main() {
	r := setupRouter()
	// Listen and Server in 0.0.0.0:8080
	r.Run()
}
