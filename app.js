const express =require("express")
const morgan= require("morgan")
const bodyParser = require ("body-parser")
const mongoose = require("mongoose");
const app = express();
const {router,hmd} = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.connect('mongodb+srv://amdi:'+process.env.MONGO_ATLAS_PW +'@node-rest-api-qiavb.mongodb.net/test?retryWrites=true'
)
 app.use(bodyParser.urlencoded({ extended: false }));
    /* 
        const product = {
          price: req.body.price
         };

    */
  app.use(bodyParser.json());
 /* 
  read variable propriete in json object
  name: req.body.name
 */
// morgan : logger screen (dev,combined)
 app.use(morgan('dev'));

// Routes which should handle requests
app.use('/products', router);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    console.log('error msg',error.message)
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports= app ;