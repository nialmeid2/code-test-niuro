# Code-test-niuro

This is the repo where the delivery for the `Take-Home Challenge` for `Niuro` will be done. I am *Nicolas Almeida* and here I'll detail both how to run the app locally

## Dev server

Since the application is split between frontend and backend, both have to be running for it to run successfully. Therefore:


1. *API key*: Create an API Key at https://www.omdbapi.com/apikey.aspx (either Patreon or free, it's up to you). 


2. *Env file*: Create a .env file at the backend directory (`./backend`). The key must be API_KEY. Your env should look like this:

````env
API_KEY=yourApikey
````

3. *Start the backend*: Go to the backend directory  and use the following commands:
	1. `npm i`
	2. `npm run start:dev`


4. *frontend env*: at the frontend directory (`./frontend`), create a .env file that looks like the the following:

````env
NEXT_PUBLIC_API_HOST=http://localhost:3001/
````


5. *Run the frontend*: With the backend running, your frontend is ready to go. Enter the frontend directory and use the following commands:
	1. `npm i`
	2. `npm run dev`
	
## Decisions details

Both the frontend and backend directories have a Readme.md of their own where I bring full details of all of the main decisions behind my line of thought