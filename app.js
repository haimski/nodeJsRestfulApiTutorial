const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.connect('mongodb://haimski:'+ process.env.MONGO_ATLAS_PW +'@node-rest-shop-shard-00-00-jln92.mongodb.net:27017,node-rest-shop-shard-00-01-jln92.mongodb.net:27017,node-rest-shop-shard-00-02-jln92.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin&retryWrites=true', 
{
    useNewUrlParser: true
});

// logs
app.use(morgan('dev'));
// sending data payload
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// cors configuration
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // usually all allowed, can be restricted to certain domains
    res.header(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === "OPTIONS"){
        req.header("Access-Control-Allow-Methods",'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// use - middleware to pass data
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found'); // node saved method
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;