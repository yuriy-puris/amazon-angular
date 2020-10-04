const router = require('express').Router();
const Category = require('../models/category');


router.route('/categories')
	.get()
	.post((req, res, next) => {
		let category = new Category();
		category.name = req.body.category;
		category.save();
		res.json({
			success: true,
			message: 'Successfull'
		});
	})

module.exports = router;