# cottageclass-map

This is a basic prototype of a mobile app for searching and finding CottageClass providers, and checking in parents. 

## Important notes:

To deploy:

 node ./node_modules/vue-gh-pages/index.js -b gh-pages

Note: I had a problem getting google maps to resize avatar images, so it currently does not. Instead, I resized all the avatar images using a command line tool. So run this in the assets folder when updating images. (This is not great, I know.)

 resize avatar* -w 40 -h 40 -o ./small-avatars
