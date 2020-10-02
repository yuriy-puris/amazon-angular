const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../config');


router.post('/signup', (req, res, next) => {
    let user = new User();
    const { name, email, password, isSeller } = req.body;
    user.name = name;
    user.email = email;
    user.password = password;
    user.picture = user.gravatar();
    user.isSeller = isSeller;

    User.findOne({ email: email }, (err, exisitingUser) => {
        if ( exisitingUser ) {
            res.json({
                success: false,
                message: 'Account with that email already exist'
            })
        } else {
            user.save();
            const token = jwt.sign(
                { user: user }, 
                config.secret,
                { expiresIn: '7d' }
            );
            res.json({
                success: true,
                message: 'Enjoy your token',
                token: token
            })
        }
    });

});

router.post('/login', (req, res, next) => {
    
    User.findOne({ email: req.body.email }, (err, user) => {
        if ( err ) throw err;
        if ( !user ) {
            res.json({
                success: false,
                message: 'User not found'
            });
        } else if ( user ) {
            const validPassword = user.comparePassword(req.body.password);
            if ( !validPassword ) {
                res.json({
                    success: false,
                    message: 'Wrong password'
                })
            } else {
                const token = jwt.sign(
                    { user: user }, 
                    config.secret,
                    { expiresIn: '7d' }
                );
                res.json({
                    success: true,
                    message: 'Enjoy your token',
                    token: token
                })
            }
        }
    });

});


module.exports = router;