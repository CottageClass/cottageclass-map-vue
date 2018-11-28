# cottageclass-map

This is the Vue.js frontend for https://app.cottageclass.com. Code for the Rails backend lives at: https://github.com/CottageClass/cottageclass-app-api

## Running locally

To run locally: 

 npm install
 npm run dev

## Deploying

Changes to master will auto deploy to https://cottageclass-app-staging.herokuapp.com/. Once staging has been QA'd, we use Heroku "pipelines" to push master to production with one click.   

## Testing locally with Express.js 

If you need to test how the production server will behave without pushing to master and testing on staging, you can start the express server locally with

 npm run start
 
