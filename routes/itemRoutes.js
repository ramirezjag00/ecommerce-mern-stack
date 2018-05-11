const mongoose = require('mongoose');
const Items = mongoose.model('items');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {

	//GET ITEMS
	app.get('/api/items', (req, res) => {
		Items.find((err,items) => {
			if (err) {
				console.log("# API GET ITEMS: ", err);
			}
			res.json(items);
		})
	});

	// //GET ITEMS NEW
	// app.get('/api/admin', (req, res) => {
	// 	Items.findById(req.params.id, (err,items) => {
	// 		if (err) {
	// 			console.log("# API GET ITEMS NEW : ", err);
	// 		} 
	// 		res.json(items);
	// 	})
	// });

	//POST BOOKS
	app.post('/api/items', (req,res) => {
		const item = req.body;

		Items.create(item, (err, items) =>{
			if (err) {
				throw err;
			}
			res.json(items);
		})
	});

	//UPDATE ITEMS
	app.put('/api/items/:_id', requireLogin, (req,res) => {
		const item = req.body;
		const query = req.params._id;

		//if the field doesn't exist $set will set a new field

		const update = {
			'$set': {
				title: item.title,
				description: item.description,
				image: item.image,
				price: item.price
			}
		};

		//When true returns the updated document
		const options = {new: true};

		Items.findOneAndUpdate(query, update, options, (err,items) => {
			if (err) {
				console.log("# API UPDATE ITEMS: ", err);
			}
			res.json;
		})
	});

	//DELETE ITEMS
	app.delete('/api/items/:_id', requireLogin, (req,res) => {
		const query = {_id: req.params._id};
		Items.remove(query, (err, items) => {
			if (err) {
				console.log("# API DELETE ITEMS: ", err);
			}
			res.json(items);
		})
	});
};