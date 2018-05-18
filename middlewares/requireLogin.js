module.exports = (req, res, next) => {
	if(!req.user) {
		//http status code 401 is unauthorized or forbidden then send error message
		return res.status(401).send({error: 'You must log in!'});
	}

	next();
};