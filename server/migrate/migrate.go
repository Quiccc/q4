/*
File Description:
Database migration file.
*/
package main

import (
	"fill-labs/q4/server/initializers"
	"fill-labs/q4/server/model"
)

/*
Function Description:
Main function for migrate package and handles the database migration.

Returns:
void
*/
func main() {
	db := initializers.DatabaseConnection()
	db.AutoMigrate(&model.User{}) //
	createUsers()
}

func createUsers() {
	db := initializers.DatabaseConnection()
	db.Create(&model.User{FirstName: "John", LastName: "Doe", Email: "john.doe@gmail.com", Address: "765 Main St., New York, NY, 10001", Phone: "1234567890", Title: "CEO"})
	db.Create(&model.User{FirstName: "Jane", LastName: "Doe", Email: "jane.doe@gmail.com", Address: "345 Main St., New York, NY, 10001", Phone: "1234567891", Title: "CTO"})
	db.Create(&model.User{FirstName: "John", LastName: "Smith", Email: "john.smith@gmail.com", Address: "451 Main St., New York, NY, 10001", Phone: "1234567892", Title: "Software Engineer"})
	db.Create(&model.User{FirstName: "Jane", LastName: "Smith", Email: "jane.smith@gmail.com", Address: "657 Main St., New York, NY, 10001", Phone: "1234567893", Title: "Tester"})
	db.Create(&model.User{FirstName: "Alice", LastName: "Johnson", Email: "alice.johnson@example.com", Address: "789 Oak St., Sometown, TX, 54321", Phone: "5557779999", Title: "Analyst"})
	db.Create(&model.User{FirstName: "Mark", LastName: "Anderson", Email: "mark.anderson@example.com", Address: "456 Pine St., Othercity, FL, 34567", Phone: "11122223333", Title: "Manager"})
	db.Create(&model.User{FirstName: "Emily", LastName: "Brown", Email: "emily.brown@example.com", Address: "567 Maple Ave., Anothercity, AZ, 67890", Phone: "44455536666", Title: "Designer"})
	db.Create(&model.User{FirstName: "Michael", LastName: "Garcia", Email: "michael.garcia@example.com", Address: "890 Cedar St., Somewhere, WA, 54321", Phone: "99983887777", Title: "Engineer"})
	db.Create(&model.User{FirstName: "Sophia", LastName: "Martinez", Email: "sophia.martinez@example.com", Address: "321 Birch St., Cityville, IL, 12345", Phone: "77784889999", Title: "Coordinator"})
	db.Create(&model.User{FirstName: "David", LastName: "Wilson", Email: "david.wilson@example.com", Address: "234 Pineapple St., Sunnytown, CA, 54321", Phone: "3334445555", Title: "Architect"})
	db.Create(&model.User{FirstName: "Olivia", LastName: "Lopez", Email: "olivia.lopez@example.com", Address: "789 Orange Ave., Brightville, TX, 98765", Phone: "66677578888", Title: "Consultant"})
	db.Create(&model.User{FirstName: "Ethan", LastName: "Harris", Email: "ethan.harris@example.com", Address: "890 Lemon Blvd., Cloud City, FL, 24680", Phone: "22233354444", Title: "Administrator"})
	db.Create(&model.User{FirstName: "Grace", LastName: "Nguyen", Email: "grace.nguyen@example.com", Address: "567 Cherry Ln., Springtown, AZ, 13579", Phone: "88899940000", Title: "Developer"})
	db.Create(&model.User{FirstName: "Liam", LastName: "Campbell", Email: "liam.campbell@example.com", Address: "123 Walnut St., Fallsville, WA, 97531", Phone: "3332221111", Title: "Analyst"})
	db.Create(&model.User{FirstName: "Zoe", LastName: "Rivera", Email: "zoe.rivera@example.com", Address: "890 Pine St., Wintercity, IL, 24680", Phone: "7776665555", Title: "Manager"})
	db.Create(&model.User{FirstName: "Jackson", LastName: "Torres", Email: "jackson.torres@example.com", Address: "456 Oak St., Hilltop, CA, 86420", Phone: "2221113333", Title: "Designer"})
	db.Create(&model.User{FirstName: "Ava", LastName: "Baker", Email: "ava.baker@example.com", Address: "789 Maple Ave., Summitville, TX, 25873", Phone: "9998887777", Title: "Engineer"})
	db.Create(&model.User{FirstName: "Noah", LastName: "Gonzalez", Email: "noah.gonzalez@example.com", Address: "234 Elm St., Valleytown, FL, 75319", Phone: "4445556666", Title: "Coordinator"})
	db.Create(&model.User{FirstName: "Mia", LastName: "Evans", Email: "mia.evans@example.com", Address: "890 Cedar St., Lakeside, IL, 96382", Phone: "6667778888", Title: "Architect"})
	db.Create(&model.User{FirstName: "James", LastName: "Perez", Email: "james.perez@example.com", Address: "567 Oak St., Hilltown, CA, 36912", Phone: "1112243323333", Title: "Consultant"})
	db.Create(&model.User{FirstName: "Charlotte", LastName: "Russell", Email: "charlotte.russell@example.com", Address: "123 Pine St., Rivertown, TX, 85246", Phone: "888437776666", Title: "Administrator"})
	db.Create(&model.User{FirstName: "William", LastName: "Sanchez", Email: "william.sanchez@example.com", Address: "456 Elm St., Beachside, FL, 74185", Phone: "555445443333", Title: "Developer"})
}
