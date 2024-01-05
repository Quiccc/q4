/*
Project: User Management App wtih RESTful API

File Description: Main file for the server.
Local server is initialized here. 
Incomiing requests are routed to the appropriate controller functions.
*/
package main

import (
	"fill-labs/q4/server/controller"
	"fill-labs/q4/server/initializers"
	"github.com/gin-gonic/gin"
)

/*
Function Description:
This function initializes the environment variables and database connection.
Gets executed before main function.

Returns:
void
*/
func init() {
	initializers.LoadEnvVariables()
	initializers.DatabaseConnection() // Delete this
}

/*
Function Description:
This function sets up the local server and routes the incoming requests to the appropriate controller functions.

Returns:
r (*gin.Engine): Router instance.
*/
func setupRouter() *gin.Engine {
	r := gin.Default() // Creates a gin router with default middleware.

	//Routes for the API endpoints
	//Example request: http://localhost:3030/api/get-users
	r.GET("/api/get-users", controller.GetAllUsers)

	//Example request: http://localhost:3030/api/create-user?firstName=John&lastName=Doe&email=john.doe%40gmail.com&address=123%20Main%20St.%2C%20New%20York%2C%20NY%2C%2010001&phone=1234567890&title=Software%20Engineer
	r.POST("/api/create-user", func(c *gin.Context) {
		firstName := c.Query("firstName")
		lastName := c.Query("lastName")
		email := c.Query("email")
		address := c.Query("address")
		phone := c.Query("phone")
		title := c.Query("title")
		controller.CreateUser(c, firstName, lastName, email, address, phone, title)
	})

	//Example request: http://localhost:3030/api/update-user?id=1&firstName=John&lastName=Doe&email=john.doe%40gmail.com&address=123%20Main%20St.%2C%20New%20York%2C%20NY%2C%2010001&phone=1234567890&title=Software%20Engineer
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

	//Example request: http://localhost:3030/api/delete-users?ids=1%202%203
	//Example request: http://localhost:3030/api/delete-users?ids=1
	r.DELETE("/api/delete-users", func(c *gin.Context) {
		ids := c.Query("ids")
		controller.DeleteUsers(c, ids)
	})

	return r
}

func main() {
	r := setupRouter()
	r.Run() // listen and serve on http://localhost:3000
}
