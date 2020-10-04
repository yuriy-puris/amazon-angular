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

mongoose.connect(config.database, err => {
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


app.listen(config.port, err => {
    console.log(`Server listening on port ${config.port}`);
});