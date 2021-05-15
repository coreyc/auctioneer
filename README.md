## Instructions for running locally
First, make sure Docker is installed.

Then, to spin up the rest of the project:

`docker-compose build` (first time running project)

`docker-compose up`

## Load auction items
To load the starting set of auction items:

`docker-compose exec api node -r esm scripts/add-starting-auction-items.js`

This will add some "default" auction items to RedisJSON. You only need to do this on the first run of this project.

## Testing bidding
For demo purposes, the bidding is hardcoded to end 30 seconds after the API starts/restarts. If you are playing around with the app and developing locally, you may need to restart the API to reset the timer:

`docker-compose restart api`