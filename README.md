# ecommerce-mern-stack


## Bazaar is a basic e-commerce web app that sells drone parachutes.

#### Created using MERN STACK (MongoDB, ExpressJS, ReactJS, NodeJS)
##### Initial design was in PSQL and Sequelize but pivoted to MongoDB and Mongoose

# TO START

- clone/download latest version Branch
- cd into the project_name
- npm install
- cd into client
- npm install
- cd .. to project_name
- npm run dev using terminal

# FOR PROD

- set up keys under config/prod directory

#### [LIVE DEV VERSION (not updated)](https://pacific-ocean-87710.herokuapp.com/)


#### CURRENT ISSUES

- EDIT CSS while using react-bootstrap or remove react-bootstrap and change to redux-form

- disable save button if any of the form is blank or don't let form submit if there is nothing in the form

- in cartRoutes, GET http://local xhr.js:178 host:3000/api/cart 401 unauthorized

- cart of certain user is the same as other user

- -current behavior, sessions overlaps the current user id inside the session of the previous session user id and takes all the items

- -search for mongosession and passport for sessions of each user

# FOR IMPROVEMENT

- use multer package in the server side to handle uploads(client/public/images or client/public/uploads) and save as array of strings in mongodb instead of manually adding photos in the directory to have a selection of images

- REACT-DROPBOX package to handle react drag/drop upload button in the form with sort of show image while uploading

- add a show book page and create gallery for images

- SENDGRID package or any emailer

- history page of user to show items bought

- STRIPE package or any payment gateway

- create a dashboard inside admin page (use d3 or other packages / framework)

- insert query from db for admin id instead of hardcoded in client side in ItemNew.js and App.js

- use reactJS techniques and es6+ syntax to shorten client / server side codes.

- and anything you could really think of...
