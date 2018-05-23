const mongoose = require("mongoose");
const {Schema} = mongoose;

const checkoutsSchema = new Schema({
 //  	owner: {
	// 	googleId:{
	// 		type:mongoose.Schema.Types.ObjectId,
	// 		ref: "users"
	// 	},
	// 	googleFname: String,
	// 	googleLname: String,
	// 	googleEmail: String
	// },
 //  	items: [
	// 	{
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref:"items"
	// 	}
	// ]
	user: String,
	date: {type:Date, default: new Date()},
	cart: [ {
		title: String,
		description: String,
		images: String,
		price: Number,
		quantity: Number
	}]
});

mongoose.model('checkouts', checkoutsSchema);
