const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
	googleId: String,
	googleFname: String,
	googleLname: String,
	googleEmail: String
});

mongoose.model('users', userSchema);