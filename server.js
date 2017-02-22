var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = require('./router');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000; // set our port

app.use('/api', router.registerRoutes());

app.listen(port, function() {
    console.log('Magic happens on port: ' + port);
});