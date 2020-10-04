const jwt = require('jsonwebtoken');
const config = require('../config');


module.exports = (req, res, next) => {

	let token = req.headers['authorization'];

	if ( token ) {
		jwt.verify(token, config.secret, (err, decoded) => {
			if ( err ) {
				res.json({
					success: false,
					message: 'Failed to authentication token'
				});
			} else {
				req.decoded = decoded;
				next();
			}
		})
	} else {
		res.status(403).json({
			success: false,
			message: 'No token provided'
		})
	}

};