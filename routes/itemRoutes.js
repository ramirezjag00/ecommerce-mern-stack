const Sequelize = require('sequelize');
const {DataTypes} = require('sequelize');
const keys = require("../config/keys"); 
const sequelize = keys.databaseURL;
const multer = require("multer");
const path = require("path");
// const sequelize = keys.DATABASE_URL;
const requireLogin = require('../middlewares/requireLogin');
const Item  = require('../models/items')(sequelize, DataTypes);

//Set Storage Engine
const storage = multer.diskStorage({
	destination: '../client/public/uploads/',
	filename: (req, file, callback) => {
		callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

//Init Upload
let upload = multer({
	storage: storage,
	limits:{fileSize: 1000000},
	fileFilter: (req,file,callback) => {
		checkFileType(file, callback);
	}
});

// Check File Type
let checkFileType = (file, callback) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
  	return callback(null,true);
  } else {
  	callback('Error: Images Only!');
  }
};

module.exports = app => {
	app.get('/api/items', requireLogin, async (req, res) => {
		const items = await Item.findAll({});
		// res.redirect('/');
		res.send(items);
	});

	app.post("/api/items", requireLogin, upload.array("image", 10), (req,res) => {
		const { name, features, included, price} = req.body;
		const image = [];
		for(let i = 0; i < req.files.length; i++){
			image.push(req.files[i].filename);
		};
		
		const item = {
			name,
			features,
			included, 
			price,
			image,
			date: Date.now()
		};
		//create a new item and save to DB
		Item.create(item, (err, newItem) => {
			(err) ? console.log(err) : res.redirect("/api/items");
		});
	});

	// NEW ROUTE
	app.get("/api/items/new", requireLogin, (req,res) => {
		res.redirect("api/items/new");
	});

	// //SHOW - RESTFUL ROUTE
	// app.get("/api/:id", async (req,res) => {
	// 	//find the Item with the provided ID
	// 	await Item.findById(req.params.id, (err,foundItem) => {
	// 		(err) res.redirect("/api/") : res.redirect("/api/:id", {item: foundItem, itemImage: foundItem.image});
	// 	});
	// });

	//SHOW - RESTFUL ROUTE
	app.get("/api/items/:id", function(req,res){
		//find the Item with the provided ID
		Item.findById(req.params.id, function(err,foundItem){
			if(err){
				res.redirect("/api/items");
			} else {
				//render show template with that item
				res.render("/api/items/:id", {item: foundItem, itemImage: foundItem.image});
			}
		});
	});

	// //update owner Route
	// app.put("/api/items/:id", requireLogin, async (req,res) => {
	// 	await Item.findByIdAndUpdate(req.params.id, {$set:{owner: req.user.id}}, (err, updatedItem) => {
	// 		(err) ? console.log(err) : res.redirect("/api/items" + req.params.id);
	// 	});
	// });

	//DESTROY ROUTE
	app.delete("/api/items/:id", requireLogin, async (req,res) => {
		await Item.findByIdAndRemove(req.params.id, (err) => {
			(err) ? res.redirect("back") : res.redirect("/api/items");
		});
	});

};

