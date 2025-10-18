# Code-test-niuro

This is the repo where the delivery for the `Take-Home Challenge` for `Niuro` will be done. I am **Nicolas Almeida** and here I'll detail both how to run the app locally

## Run locally in development

Since the application is split between frontend and backend, both have to be running for it to run successfully. Therefore:


1. **API key**: Create an API Key at https://www.omdbapi.com/apikey.aspx (either Patreon or free, it's up to you). 

2. **Running the Database**: Install and run Docker Desktop and use the following command on the root directory of this project: `docker-compose up postgres_db -d`

3. **Env file**: Create a .env file at the backend directory (`./backend`). The key must be API_KEY. Also, the CONN_STRING should also be present (the provided one below will do the trick). Your env should look like this:

````env
API_KEY=yourApikey
CONN_STRING=postgresql://user:pass@localhost:5431/db?schema=public
````

Ps: if you change the user, password or db_name on docker-compose.yml, don't forget to also change it in the .env file

4. **Start the backend**: Go to the backend directory  and use the following commands:
	1. `npm i`
	2. `npm run start:dev`


5. **frontend env**: at the frontend directory (`./frontend`), create a .env file that looks like the the following:

````env
NEXT_PUBLIC_API_HOST=http://localhost:3001/
````


6. **Run the frontend**: With the backend running, your frontend is ready to go. Enter the frontend directory and use the following commands:
	1. `npm i`
	2. `npm run dev`
	

Ps: If you run this app via docker, you might need to delete node_modules and re run `npm i` when you try this mode again
	
	
## Run locally in containers

1. Install, if not already installed, `docker desktop` on your machine.

2. **API key**: Create an API Key at https://www.omdbapi.com/apikey.aspx (either Patreon or free, it's up to you). 

3. Open `docker-compose.yml` and change the line `API_KEY: xxxxx` to your generated API KEY. If you want, feel free to change the db container user info, but don't forget to also change on the `CONN_STRING` variable on the backend container

4. Run `docker-compose up` in the root directory of this project

5. Open your browser and go to localhost:3000 after docker finishes composing the containers (You will see `INFO  Accepting connections at http://localhost:3000` in the console and a bunch of Nestjs endpoints, so do not close it)


If you want to change any configs, feel free to change the docker-compose.yml file
	
## Decisions details

Both the frontend and backend directories have a Readme.md of their own where I bring full details of all of the main decisions behind my line of thought