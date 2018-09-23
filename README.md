# cottageclass-map

This is a basic prototype of a mobile app for searching and finding CottageClass providers, and checking in parents. 

## Setup

Setup:

 npm install

 npm run dev

Deploy (to Github Pages)

 npm run deploy

## Notes:

We're requiring folks to navigate somewhere specific to access the app, to keep peoples' contact information private. These URLs open the app.

Dev: 

<http://localhost:8080/#/y723hz/>

Deploy:

<https://app.cottageclass.com/SmpPbG11MxptIUdcQWNCAyJu1IgvvtlPCTPkUCX1xqLo6uxK7v6fdqKWo/#/y723hz> (Currently waiting for DNS to get set up correctly.)

Also: I had a problem getting google maps to resize avatar images, so it currently does not. So that needs to be fixed or done by hand. 

To get the CNAME to work correctly, I changed line 101 of node_modules/vue-gh-pages to the following, so that those key files would get put someplace else. 

 const pathToBuild = '/'; 
