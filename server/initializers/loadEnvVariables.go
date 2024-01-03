/*
File Description:
Initializer file for loading environment variables.
*/
package initializers

import "github.com/joho/godotenv"
import "log"

/*
Function Description:
This function loads the environment variables from the .env file.

Returns:
void
*/
func LoadEnvVariables() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}