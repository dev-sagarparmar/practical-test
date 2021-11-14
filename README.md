## create .env file with below mentioned details to start the server
	NODE_ENV= 'add your environment name here'
	PORT='add your port'
	PGHOST='postgres host ip or url'
	PGPORT='postgres port'
	DB_NAME='postgres dbName'
	PGUSER='postgres username'
	PGPASS='postgres password'
	DEBUG_SQL= false
	JWT_SECRET='your JWT secret'
	JWT_EXPIRATION='JWT expiration hrs'
    
#### Use "npm install" to install dependencies

#### Use "npm run dev" to run development server

#### Use "npx run migrate-create" to create/add new migration

#### Use "npx run migrate" to run migration

#### Run "npm run eslint" to check linting