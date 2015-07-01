var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    handler = require('./handlers.js');

var app = express();
var port = process.env.PORT || 3000;

/** CORS **/
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

/** Middlewares **/
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/** Routes **/
var router = express.Router();

// Order
router.route('/order')
    .post(handler.order.create);

// Status
router.route('/status')
    .get(handler.status.get);

app.use('/',router);


app.listen(port);
