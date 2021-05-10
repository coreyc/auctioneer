## Instructions for running locally
First, make sure Docker is installed.

Then, to spin up the rest of the project:

`docker-compose up --build`

## Load auction items
To load the starting set of auction items:

`docker-compose exec api node -r esm scripts/add-starting-auction-items.js`

This will add some "default" auction items to RedisJSON. You only need to do this on the first run of this project.