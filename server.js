const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config');

const app = express();

// ROUTERS
const routesUser = require('./routes/account');
const routesMain = require('./routes/main');
const routesSeller = require('./routes/seller');
const routesProductSearch = require('./routes/product-search');

mongoose.connect(config.database, { useMongoClient: true }, err => {
    if ( err ) {
        console.log(err);
    } else {
        console.log('Connected to the database');
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

app.use('/api', routesMain);
app.use('/api/account', routesUser);
app.use('/api/seller', routesSeller);
app.use('/api/search', routesProductSearch);


app.listen(config.port, err => {
    console.log(`Server listening on port ${config.port}`);
});