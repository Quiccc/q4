# FillLabs Q4

In Q4, a WEB application is implemented. Application is a simple user management system using the default WEB framework of Go, Next.js & React. All CRUD operations are handled via a REST API.

## How to Deploy the Application

First, open up a terminal inside the root of the project. There are 4 commands that can be executed via the included Makefile. Which are as follows:

```python
#Deploy the local backend server @ http://localhost:3030
make deploy-backend

#Deploy local frontend server @ http://localhost:3000
make deploy-frontend

#Migrate database
make migrate-database

#Run the test file for API controller.
make run-test
```

If you do not have the Makefile functionality, below commands can be executed inside the terminal to perform all tasks:

```python
#Deploy the local backend server @ http://localhost:3030
cd server && CompileDaemon -command="./server"

#Deploy local frontend server @ http://localhost:3000
cd client && npm run build && npx next start -p 3000

#Migrate database
cd server && Del q4.db && go run migrate/migrate.go

#Run the test file for API controller.
cd server && cd controller && go test -v
```

Project comes without a Sqllite database file .db initially. Database must be migrated before deploying the project to generate a .db file with some seeded example data.

## API Usage

#### Fetch all users

```http
  GET /api/get-users
```

| Param | Value   | Description |
| :---- | :------ | :---------- |
| `Key` | `Value` |             |

#### Create new user

```http
  GET http://localhost:3030/api/create-user?firstName={firstName}&lastName={lastName}&email={email}&address={address}&phone={phone}&title={title}
```

| Param       | Value       | Description |
| :---------- | :---------- | :---------- |
| `firstName` | `firstName` |             |
| `lastName`  | `lastName`  |             |
| `email`     | `email`     |             |
| `address`   | `address`   |             |
| `phone`     | `phone`     |             |
| `title`     | `title`     |             |

#### Update user

```http
  PUT http://localhost:3030/api/update-user?id={id}&firstName={firstName}&lastName={lastName}&email={email}&address={address}&phone={phone}&title={title}
```

| Param       | Value       | Description |
| :---------- | :---------- | :---------- |
| `id`        | `id`        |             |
| `firstName` | `firstName` |             |
| `lastName`  | `lastName`  |             |
| `email`     | `email`     |             |
| `address`   | `address`   |             |
| `phone`     | `phone`     |             |
| `title`     | `title`     |             |

#### Delete user(s)

```http
  DELETE /api/delete-users?ids={id1}%20{id2}%20{id3}
```

| Param | Value         | Description |
| :---- | :------------ | :---------- |
| `ids` | `id1 id2 id3` |             |

## Testing

There is an unit testing file for the REST API. Steps for running the test file is explained in the "How to Deploy the Application" section. Testing is written for the seeded data in the migration file. Therefore, to get the intended results, run the test while right after the first migration or delete the .db file and re-migrate the database.
