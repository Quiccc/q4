deploy-frontend:
	@echo "Deploying frontend..."
	@cd client && npm run build && npx next start -p 3000

deploy-backend:
	@echo "Deploying backend..."
	@cd server && CompileDaemon -command="./server"

migrate-database:
	@echo "Migrating database..."
	@cd server && Del q4.db && go run migrate/migrate.go
	
run-test:
	@echo "Running tests..."
	@cd server && cd controller && go test -v
