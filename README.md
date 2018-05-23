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

#### CURRENT BEHAVIOR in Item Form or '/admin' route
- when images btn is clicked, image text box should update immediately
[current behavior] when images btn is clicked, image text box should be touched next to show the current value

- when you add an item, the select dropdown should update
[current behavior] when you add an item, the select dropdown doesn't update immediately, still have to refresh
 
- when you click select and choose an item ID, delete button will be enabled, and if you choose the default back, the button should be disabled
[current behavior] when you click select and choose an item ID, delete button will be enabled, but if you choose the default back, the button will still be enabled

# FOR IMPROVEMENT

- use multer package in the server side to handle uploads(client/public/images or client/public/uploads) and save as array of strings in mongodb instead of manually adding photos in the directory to have a selection of images

- REACT-DROPBOX package to handle react drag/drop upload button in the form with sort of show image while uploading

- add a show item page and create gallery for images

- SENDGRID package or any emailer

- history page of user to show items bought

- STRIPE package or any payment gateway

- create a dashboard inside admin page (use d3 or other packages / framework)

- insert query from db for admin id instead of hardcoded in client side in ItemNew.js and App.js 

- in authRoutes.js, remove req.session.destroy and in cartRoutes.js, add in req.session.regenerate and req.session.save to make a user independent sessions (express-session and connect-mongo)

- use reactJS techniques and es6+ syntax to shorten client / server side codes.

- and anything you could really think of...
