var url = require('url');
var _ = require('underscore');
var request = require('request');

var url_company_names = "http://example.com/names";
var url_company = "http://example.com/company?";
//var url_test = "http://developer.cumtd.com/api/v2.2/json/GetStop?" +
//    "key=d99803c970a04223998cabd90a741633" +
//    "&stop_id=it"

var names = [];

exports.index = function(req, res){
    request({
        url: url_company_names,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log(body) // Print the json response
            names = body;
        }
    })
    res.render('index', { test: 'Express' });
};


exports.api = function(req, res){

    var url_parts = url.parse(req.url, true);
    var query = url_parts.query.name;
    console.log("QUERY:"+query);
    console.log(names)
    result = _.filter(names, function(el){
        return (el.value.indexOf(query) > -1)
    });
    console.log(result)

    res.contentType('application/json');
    res.send(JSON.stringify(result));
};

exports.company = function(req, res){
    var url_parts = url.parse(req.url, true);
    var c_name = url_parts.query.name;
    console.log("name:"+c_name);
    var company_data = {};

    request({
        url: url_company+"name="+c_name,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log(body) // Print the json response
            company_data = body;
        }else{
            res.render('index', { test: 'Express' });
        }
    })
    console.log("COMPANYDATA:"+company_data);

    res.render('company', { data: company_data });
};


