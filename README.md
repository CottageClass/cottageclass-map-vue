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
 
## Testing locally on mobile devices
 
To test locally on machines other than your development machine, we currently take the following steps:
 
1. determine the local IP of your dev machine is (e.g. 192.168.0.4) and add that to the [Valid OAuth Redirect URIs](https://developers.facebook.com/apps/905335782985620/fb-login/settings/) in the Facebook developer settings, in the form e.g. `192.168.0.4:8077/oauth-callback` (depending on your IP and port). (Otherwise, you will not be able to login on the device.)

2. add the line `host: '0.0.0.0'` to the devServer object in `config/webpack.dev.conf.js`. (Otherwise your local dev server will not accept the incoming connection.) 

(We may wish to make this second change permanent and find a solution that doesn't require us to modify the facebook settings every time we happen to use a device with a new local IP.) 


