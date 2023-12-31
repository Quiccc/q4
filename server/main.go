package main

import (
	"fill-labs/q4/server/controller"
	"fill-labs/q4/server/initializers"
	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.DatabaseConnection()}

func setupRouter() *gin.Engine {
	r := gin.Default()

	r.GET("/api/users", controller.GetAllUsers)

	return r
}

func main() {
	r := setupRouter()
	// Listen and Server in 0.0.0.0:8080
	r.Run()
}
