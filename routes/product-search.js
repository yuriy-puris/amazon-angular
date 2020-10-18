const router = require('express').Router();

const algoliasearch = require('algoliasearch');
const client = algoliasearch('EVJS81TQDC', 'd635acac62b46c14ef670f423789872f');
const index = client.initIndex('amazonov1');

const Product = require('../models/product');

router.get('/', (req, res, next) => {
    const searchField = req.query.query;
    console.log(searchField)
    Product.find({ title: { $regex: searchField, $options: '$i' } }, (err, products) => {
        if (err) {
            res.json({
                success: true,
                message: 'Not found product'
            })
        } else {
            res.json({
                success: true,
                message: 'Success',
                products: products
            })
        }
    })
  });

module.exports = router;