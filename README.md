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

- should have sign up as well or option to log in using different google account

- FORM CAN SUBMIT AN ITEM EVEN W/O VALUES (validation in admin page)

- admin page should accessible only when 'admin' is logged in (HOC)

- verification first before proceeding (cancel and proceed)

- make navbar sticky or just show a small badge beside the item to show number of items in cart

- Products Link in other routes in navbar is not accessible

- still have to refresh page to show the active link in the navbar

- EDIT CSS since we used react-bootstrap

# FOR IMPROVEMENT

- use multer package in the server side to handle uploads(client/public/images or client/public/uploads) and save as array of strings in mongodb instead of manually adding photos in the directory to have a selection of images

- REACT-DROPBOX package to handle react drag/drop upload button in the form with sort of show image while uploading

- add a show book page and create gallery for images

- SENDGRID package or any emailer

- STRIPE package or any payment gateway

- create a dashboard inside admin page (use d3 or other packages / framework)

- use reactJS techniques and es6+ syntax to shorten client / server side codes.

- and anything you could really think of...
