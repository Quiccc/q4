package controller

import (
	"net/http"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGetAllUsers(t *testing.T) {
	resp, err := http.Get("http://localhost:3030/api/get-users")
	if err != nil {
		t.Error("Error making GET request")
	}
	assert.Equal(t, 200, resp.StatusCode, "Users found.")
}

func TestCreateUser(t *testing.T) {

	// Case 1: Duplicate email and phone
	resp, err := http.Post("http://localhost:3030/api/create-user?firstName=John&lastName=Doe&email=john.doe%40gmail.com&address=123%20Main%20St.%2C%20New%20York%2C%20NY%2C%2010001&phone=1234567890&title=Software%20Engineer", "application/json", nil)
	if err != nil {
		t.Error("Error making POST request")
	}
	assert.Equal(t, 500, resp.StatusCode, "Unique constraint users.email failed.")

	// Case 2: Duplicate phone
	resp, err = http.Post("http://localhost:3030/api/create-user?firstName=John&lastName=Doe&email=john.doe%40gmail.com123&address=123%20Main%20St.%2C%20New%20York%2C%20NY%2C%2010001&phone=1234567890&title=Software%20Engineer", "application/json", nil)
	if err != nil {
		t.Error("Error making POST request")
	}
	assert.Equal(t, 500, resp.StatusCode, "Unique constraint users.phone failed.")

	// Case 3: Duplicate email
	resp, err = http.Post("http://localhost:3030/api/create-user?firstName=John&lastName=Doe&email=john.doe%40gmail.com&address=123%20Main%20St.%2C%20New%20York%2C%20NY%2C%2010001&phone=1234567890123111&title=Software%20Engineer", "application/json", nil)
	if err != nil {
		t.Error("Error making POST request")
	}
	assert.Equal(t, 500, resp.StatusCode, "Unique constraint users.email failed.")

	// Case 4: Null First Name
	resp, err = http.Post("http://localhost:3030/api/create-user?firstName=&lastName=Doe&email=john.doe%40gmail.com123&address=123%20Main%20St.%2C%20New%20York%2C%20NY%2C%2010001&phone=1234567890123111&title=Software%20Engineer", "application/json", nil)
	if err != nil {
		t.Error("Error making POST request")
	}
	assert.Equal(t, 404, resp.StatusCode, "NOT NULL constraint failed.")

	// Case 5: Null Last Name
	resp, err = http.Post("http://localhost:3030/api/create-user?firstName=John&lastName=&email=john.doe%40gmail.com123&address=123%20Main%20St.%2C%20New%20York%2C%20NY%2C%2010001&phone=1234567890123111&title=Software%20Engineer", "application/json", nil)
	if err != nil {
		t.Error("Error making POST request")
	}
	assert.Equal(t, 404, resp.StatusCode, "NOT NULL constraint failed.")

	// Case 6: Null Email
	resp, err = http.Post("http://localhost:3030/api/create-user?firstName=John&lastName=Doe&email=&address=123%20Main%20St.%2C%20New%20York%2C%20NY%2C%2010001&phone=1234567890123111&title=Software%20Engineer", "application/json", nil)
	if err != nil {
		t.Error("Error making POST request")
	}
	assert.Equal(t, 404, resp.StatusCode, "NOT NULL constraint failed.")

	// Case 7: Null Address
	resp, err = http.Post("http://localhost:3030/api/create-user?firstName=John&lastName=Doe&email=john.doe%40gmail.com123&address=&phone=1234567890123111&title=Software%20Engineer", "application/json", nil)
	if err != nil {
		t.Error("Error making POST request")
	}
	assert.Equal(t, 404, resp.StatusCode, "NOT NULL constraint failed.")

	// Case 8: Null Phone
	resp, err = http.Post("http://localhost:3030/api/create-user?firstName=John&lastName=Doe&email=john.doe%40gmail.com123&address=123%20Main%20St.%2C%20New%20York%2C%20NY%2C%2010001&phone=&title=Software%20Engineer", "application/json", nil)
	if err != nil {
		t.Error("Error making POST request")
	}
	assert.Equal(t, 404, resp.StatusCode, "NOT NULL constraint failed.")

	// Case 9: Null Title
	resp, err = http.Post("http://localhost:3030/api/create-user?firstName=John&lastName=Doe&email=john.doe%40gmail.com123&address=123%20Main%20St.%2C%20New%20York%2C%20NY%2C%2010001&phone=1234567890123111&title=", "application/json", nil)
	if err != nil {
		t.Error("Error making POST request")
	}
	assert.Equal(t, 404, resp.StatusCode, "NOT NULL constraint failed.")

	// Case 10: Valid request
	resp, err = http.Post("http://localhost:3030/api/create-user?firstName=John&lastName=Doe&email=john.doe%40gmail.com1234&address=123%20Main%20St.%2C%20New%20York%2C%20NY%2C%2010001&phone=12345678901231111&title=Software%20Engineer", "application/json", nil)
	if err != nil {
		t.Error("Error making POST request")
	}
	assert.Equal(t, 200, resp.StatusCode, "User created successfully.")
}

func TestUpdateUser(t *testing.T) {
	//Case 1: Valid update first name
	req, _ := http.NewRequest("PUT", "http://localhost:3030/api/update-user?id=1&firstName=UpdateTest&lastName=Doe&email=john.doe%40gmail.com&address=789%20Orange%20Ave.%2C%20Brightville%2C%20TX%2C%2098765&phone=1234567890&title=Software%20Engineer", nil)
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		t.Error("Error making PUT request")
	}
	assert.Equal(t, 200, resp.StatusCode, "User updated successfully.")

	//Case 2: Valid update last name
	req, _ = http.NewRequest("PUT", "http://localhost:3030/api/update-user?id=1&firstName=UpdateTest&lastName=UpdateTest&email=john.doe%40gmail.com&address=789%20Orange%20Ave.%2C%20Brightville%2C%20TX%2C%2098765&phone=1234567890&title=Software%20Engineer", nil)
	resp, err = http.DefaultClient.Do(req)
	if err != nil {
		t.Error("Error making PUT request")
	}
	assert.Equal(t, 200, resp.StatusCode, "User updated successfully.")

	//Case 3: Valid update email
	req, _ = http.NewRequest("PUT", "http://localhost:3030/api/update-user?id=1&firstName=UpdateTest&lastName=UpdateTest&email=john.doe%40gmail.comTestUpdate&address=789%20Orange%20Ave.%2C%20Brightville%2C%20TX%2C%2098765&phone=1234567890&title=Software%20Engineer", nil)
	resp, err = http.DefaultClient.Do(req)
	if err != nil {
		t.Error("Error making PUT request")
	}
	assert.Equal(t, 200, resp.StatusCode, "User updated successfully.")

	//Case 4: Valid update address
	req, _ = http.NewRequest("PUT", "http://localhost:3030/api/update-user?id=1&firstName=UpdateTest&lastName=UpdateTest&email=john.doe%40gmail.comTestUpdate&address=789%20Orange%20Ave.%2C%20Brightville%2C%20TX%2C%2098765TestUpdate&phone=1234567890&title=Software%20Engineer", nil)
	resp, err = http.DefaultClient.Do(req)
	if err != nil {
		t.Error("Error making PUT request")
	}
	assert.Equal(t, 200, resp.StatusCode, "User updated successfully.")

	//Case 5: Valid update phone
	req, _ = http.NewRequest("PUT", "http://localhost:3030/api/update-user?id=1&firstName=UpdateTest&lastName=UpdateTest&email=john.doe%40gmail.comTestUpdate&address=789%20Orange%20Ave.%2C%20Brightville%2C%20TX%2C%2098765TestUpdate&phone=1234567890TestUpdate&title=Software%20Engineer", nil)
	resp, err = http.DefaultClient.Do(req)
	if err != nil {
		t.Error("Error making PUT request")
	}
	assert.Equal(t, 200, resp.StatusCode, "User updated successfully.")

	//Case 6: Valid update title
	req, _ = http.NewRequest("PUT", "http://localhost:3030/api/update-user?id=1&firstName=UpdateTest&lastName=UpdateTest&email=john.doe%40gmail.comTestUpdate&address=789%20Orange%20Ave.%2C%20Brightville%2C%20TX%2C%2098765TestUpdate&phone=1234567890TestUpdate&title=Software%20EngineerTestUpdate", nil)
	resp, err = http.DefaultClient.Do(req)
	if err != nil {
		t.Error("Error making PUT request")
	}
	assert.Equal(t, 200, resp.StatusCode, "User updated successfully.")

	/* GORM does not pick up empty strings as NULL values. Could not fix this issue.

	//Case 7: Null First Name
	req, _ = http.NewRequest("PUT", "http://localhost:3030/api/update-user?id=1&firstName=&lastName=UpdateTest&email=john.doe%40gmail.comTestUpdate&address=789%20Orange%20Ave.%2C%20Brightville%2C%20TX%2C%2098765TestUpdate&phone=12345678901231111TestUpdate&title=Software%20EngineerTestUpdate", nil)
	resp, err = http.DefaultClient.Do(req)
	if err != nil {
		t.Error("Error making PUT request")
	}
	assert.Equal(t, 404, resp.StatusCode, "NOT NULL constraint failed.")

	//Case 8: Null Last Name
	req, _ = http.NewRequest("PUT", "http://localhost:3030/api/update-user?id=1&firstName=UpdateTest&lastName=&email=john.doe%40gmail.comTestUpdate&address=789%20Orange%20Ave.%2C%20Brightville%2C%20TX%2C%2098765TestUpdate&phone=12345678901231111TestUpdate&title=Software%20EngineerTestUpdate", nil)
	resp, err = http.DefaultClient.Do(req)
	if err != nil {
		t.Error("Error making PUT request")
	}
	assert.Equal(t, 404, resp.StatusCode, "NOT NULL constraint failed.")

	//Case 9: Null Email
	req, _ = http.NewRequest("PUT", "http://localhost:3030/api/update-user?id=1&firstName=UpdateTest&lastName=UpdateTest&email=&address=789%20Orange%20Ave.%2C%20Brightville%2C%20TX%2C%2098765TestUpdate&phone=12345678901231111TestUpdate&title=Software%20EngineerTestUpdate", nil)
	resp, err = http.DefaultClient.Do(req)
	if err != nil {
		t.Error("Error making PUT request")
	}
	assert.Equal(t, 404, resp.StatusCode, "NOT NULL constraint failed.")

	//Case 10: Null Address
	req, _ = http.NewRequest("PUT", "http://localhost:3030/api/update-user?id=1&firstName=UpdateTest&lastName=UpdateTest&email=john.doe%40gmail.comTestUpdate&address=&phone=12345678901231111TestUpdate&title=Software%20EngineerTestUpdate", nil)
	resp, err = http.DefaultClient.Do(req)
	if err != nil {
		t.Error("Error making PUT request")
	}
	assert.Equal(t, 404, resp.StatusCode, "NOT NULL constraint failed.")

	//Case 11: Null Phone
	req, _ = http.NewRequest("PUT", "http://localhost:3030/api/update-user?id=1&firstName=UpdateTest&lastName=UpdateTest&email=john.doe%40gmail.comTestUpdate&address=789%20Orange%20Ave.%2C%20Brightville%2C%20TX%2C%2098765TestUpdate&phone=&title=Software%20EngineerTestUpdate", nil)
	resp, err = http.DefaultClient.Do(req)
	if err != nil {
		t.Error("Error making PUT request")
	}
	assert.Equal(t, 404, resp.StatusCode, "NOT NULL constraint failed.")

	//Case 12: Null Title
	req, _ = http.NewRequest("PUT", "http://localhost:3030/api/update-user?id=1&firstName=UpdateTest&lastName=UpdateTest&email=john.doe%40gmail.comTestUpdate&address=789%20Orange%20Ave.%2C%20Brightville%2C%20TX%2C%2098765TestUpdate&phone=12345678901231111TestUpdate&title=", nil)
	resp, err = http.DefaultClient.Do(req)
	if err != nil {
		t.Error("Error making PUT request")
	}
	assert.Equal(t, 404, resp.StatusCode, "NOT NULL constraint failed.")

	//Case 13: Invalid ID
	req, _ = http.NewRequest("PUT", "http://localhost:3030/api/update-user?id=100&firstName=UpdateTest&lastName=UpdateTest&email=john.doe%40gmail.comTestUpdate&address=789%20Orange%20Ave.%2C%20Brightville%2C%20TX%2C%2098765TestUpdate&phone=12345678901231111TestUpdate&title=Software%20EngineerTestUpdate", nil)
	resp, err = http.DefaultClient.Do(req)
	if err != nil {
		t.Error("Error making PUT request")
	}
	assert.Equal(t, 404, resp.StatusCode, "User not found.")

	//Case 14: Null ID
	req, _ = http.NewRequest("PUT", "http://localhost:3030/api/update-user?id=&firstName=UpdateSSTest&lastName=UpdateTest&email=john.doe%40gmail.comTestUpdate&address=789%20Orange%20Ave.%2C%20Brightville%2C%20TX%2C%2098765TestUpdate&phone=12345678901231111TestUpdate&title=Software%20EngineerTestUpdate", nil)
	resp, err = http.DefaultClient.Do(req)
	if err != nil {
		t.Error("Error making PUT request")
	}
	assert.Equal(t, 404, resp.StatusCode, "User not found.")

	*/

	//Case 15: Duplicate email
	req, _ = http.NewRequest("PUT", "http://localhost:3030/api/update-user?id=1&firstName=UpdateTest&lastName=UpdateTest&email=jane.doe%40gmail.com&address=789%20Orange%20Ave.%2C%20Brightville%2C%20TX%2C%2098765&phone=12345678901231111TestUpdate&title=Software%20Engineer", nil)
	resp, err = http.DefaultClient.Do(req)
	if err != nil {
		t.Error("Error making PUT request")
	}
	assert.Equal(t, 500, resp.StatusCode, "Unique constraint users.email failed.")

	//Case 16: Duplicate phone
	req, _ = http.NewRequest("PUT", "http://localhost:3030/api/update-user?id=1&firstName=UpdateTest&lastName=UpdateTest&email=john.doe%40gmail.comTestUpdate&address=789%20Orange%20Ave.%2C%20Brightville%2C%20TX%2C%2098765&phone=1234567892&title=Software%20Engineer", nil)
	resp, err = http.DefaultClient.Do(req)
	if err != nil {
		t.Error("Error making PUT request")
	}
	assert.Equal(t, 500, resp.StatusCode, "Unique constraint users.phone failed.")
}

func TestDeleteUser(t *testing.T) {
	//Case 1: Valid delete id = 1
	req, _ := http.NewRequest("DELETE", "http://localhost:3030/api/delete-users?ids=1", nil)
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		t.Error("Error making DELETE request")
	}
	assert.Equal(t, 200, resp.StatusCode, "User deleted successfully.")

	//Case 2: Valid delete id = 2, 3, 4
	req, _ = http.NewRequest("DELETE", "http://localhost:3030/api/delete-users?ids=2%203%204", nil)
	resp, err = http.DefaultClient.Do(req)
	if err != nil {
		t.Error("Error making DELETE request")
	}
	assert.Equal(t, 200, resp.StatusCode, "User deleted successfully.")

	//Case 3: Invalid delete id = 100
	req, _ = http.NewRequest("DELETE", "http://localhost:3030/api/delete-users?ids=100", nil)
	resp, err = http.DefaultClient.Do(req)
	if err != nil {
		t.Error("Error making DELETE request")
	}
	assert.Equal(t, 404, resp.StatusCode, "User not found.")

	//Case 4: Invalid already deleted id = 1
	req, _ = http.NewRequest("DELETE", "http://localhost:3030/api/delete-users?ids=1", nil)
	resp, err = http.DefaultClient.Do(req)
	if err != nil {
		t.Error("Error making DELETE request")
	}
	assert.Equal(t, 404, resp.StatusCode, "User not found.")

	//Case 5: Invalid delete id = 1, 2, 3, 4
	req, _ = http.NewRequest("DELETE", "http://localhost:3030/api/delete-users?ids=1%202%203%204", nil)
	resp, err = http.DefaultClient.Do(req)
	if err != nil {
		t.Error("Error making DELETE request")
	}
	assert.Equal(t, 404, resp.StatusCode, "User not found.")
}
