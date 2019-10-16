# Cameo food inspections project

## Getting Started

Open a terminal, git clone this repo and navigate to the root of the project.

To start the API:
```
docker-compose up -d # builds the api and database containers and leaves them running in the background
```

**If this is your first time running the application**:
```
sh first_time.sh # creates the sym-link for CLI, executes migrations in the database, and seeds the database.
```

To stop the API:
```
docker-compose down
```

To start the CLI tool, execute `get-tables` and wait for the prompt to start!

To start exploring the API, navigate to http://localhost:3000/inspections/?limit=5&includeViolations=true in a browser!

## Requirements

You will need [Docker](https://www.docker.com/products/docker-desktop) and [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) for the API as well as [Node.js](https://github.com/nvm-sh/nvm) to run the CLI. If you are running on macOS Mavericks or above, you should already have XCode command line tools baked in, so you can run `git --version` to check which version of git you have.

### If you would like to run the application on your local machine without a container
You will need Node.js 8.9.1 and PostgreSQL 11.5. 

To get Node.js installed, I like to use the [Node Version Manager](https://github.com/nvm-sh/nvm) where I can easily install different Node versions and switch between them. For PostgreSQL, if you are on macOS I love using [Postgres.app](https://postgresapp.com/). It automatically installs the Postgres CLI, and it comes with a really useful desktop app. I find it pairs nicely with an app called [Postico](https://eggerapps.at/postico/). If you are not on a mac, you can use https://www.enterprisedb.com/downloads/postgresql to get a Postgres install.

#### Setup for local development and running the application.

To setup the application, git clone this repository.
1. Ensure postgres is running.
2. Create a database in postgres called cameo_development
3. Edit the config file under config/config.json to set your local username and password
4. `npm install`
5. `npm link`, enables the CLI
6. `./node_modules/.bin/sequelize db:migrate`
7. `./node_modules/.bin/sequelize db:seed:all`

To start the application API:
```
npm run dev # run with nodemon
```
or
```
npm run start # run with node process
```

To run the CLI:
```
create-table
```

To run tests:
```
npm run test
```

## Using the CLI

The CLI is easy to use, just execute `get-tables` to start a session where you will input necessary information. Execute `get-tables -h` to see the documentation for other options that you can include, such as specifying a different output directory for the csv files.

## Using the API

There are 2 resources that you can retrieve with this read-only API: Inspections and Violations.

### Inspections route
The inspections route is located at /inspections. Inspections have 0 or many violations associated with them.

GET /inspections
Retrieves all inspections in the database. If you would like to limit the number of results returned, include the query parameter 'limit'. Eg. /inspections?limit=500 to get 500 of the most recent inspections. If you would like to also get any violations associated with the inspections, use the query parameter includeViolations=true.

Returns an JSON object with two keys, data and 'success'. If the query was successful, the 'success' key will have the boolean value true. The data key has an array of objects where each object has the format:
```
{
  inspection_id: INTEGER,
  dba_name: TEXT,
  aka_name: TEXT,
  license_: INTEGER,
  facility_type: TEXT,
  risk: TEXT,
  address: TEXT,
  city: TEXT,
  state: TEXT,
  zip: INTEGER,
  inspection_date: DATE,
  inspection_type: TEXT,
  results: STRING,
  latitude: FLOAT,
  longitude: FLOAT
  violations: if includeViolations=true, Array of violation objects, specified below
}
```

If the query is not successful, it will return HTTP status code 500, and the returned JSON object will have a 'message' field with information about the error that occured and 'success' field set to boolean value false.

GET /inspections/:inspectionId

Retrieves a single inspection and returns a JSON object with the keys data and success. If the inspectionId cannot be found, it will return HTTP status code 404 and will have 'message' field that will say 'No inspection found for id: inspectionId' where the inspectionId is the given id.

If you would like to also get any violations associated with the inspection, use the query parameter includeViolations=true.

### Violations route

GET /violations

Retrieve all violations. Limit the results with the 'limit' query parameter. If you would like the associated inspection, use the query parameter includeInspection=true. The returned JSON object has the keys 'data' and 'success'. If the query was successful, the 'success' key will have the boolean value true.

The returned array of violations will have the format:
{
  id: INTEGER,
  inspection_id: INTEGER,
  name: STRING,
  comments: TEXT,
  inspection: inspection object specified above, if query parameter includeInspection=true
}


GET /violations/:violationId

Retrieves a single violation by violation id. If the violationId cannot be found it will return HTTP status code 404 and will have 'message' field that will say 'No violation found for id: violationId' where the violationId is the given id.

Include the query parameter includeInspection=true to also retrieve the inspection associated with the violation.

