var express = require('express');
var request = require('request');
var jiraUrl = "https://yourJira.com/rest/api/2";

var exports = module.exports = {};

exports.registerRoutes = function() {
    var router = express.Router();

    router.get('/*', function(req, res) {

        var url = req.url;
        var token = req.headers.authorization;
        //console.log("request url: " + url);
        console.log("token: " + req.headers.authorization);

        request({
            methode: "GET",
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            uri: jiraUrl + url
        }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                //console.log(body);
            }

            res.status(response.statusCode);
            res.set('Content-Type', 'application/json');
            res.json(response.body);
        });
    });

    router.post('/*', function(req, res) {

        var url = req.url;
        var token = req.headers.authorization;
        var body = req.body;
        //console.log("request url: " + url);
        console.log("token: " + req.headers.authorization);
        console.log("body: " + JSON.stringify(body));

        request.post({
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            uri: jiraUrl + url,
            json: body
        }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }

            console.log("error: " + error);
            console.log("status code: " + response.statusCode);
            console.log("response: " + JSON.stringify(response.body));

            res.status(response.statusCode);
            res.set('Content-Type', 'application/json');
            res.json(response.body);
        });
    });

    router.put('/*', function(req, res) {

        var url = req.url;
        var token = req.headers.authorization;
        var body = req.body;
        //console.log("request url: " + url);
        console.log("token: " + req.headers.authorization)
        console.log("body: " + JSON.stringify(body));

        request.put({
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            uri: jiraUrl + url,
            json: body
        }, function(error, response, body) {
            if (!error && response.statusCode > 200 && response.statusCode < 400) {
                console.log(body);
            }

            console.log("error: " + error);
            console.log("status code: " + response.statusCode);
            console.log("response: " + JSON.stringify(response.body));

            res.status(response.statusCode);
            res.set('Content-Type', 'application/json');
            res.json(response.body);
        });
    });


    return router;
}