var url = require('url');
var _ = require('underscore');
var request = require('request');

var url_company_names = "http://finance-kpirisk.rhcloud.com/rest/risk/corporations";
var url_company = "http://finance-kpirisk.rhcloud.com/rest/risk/data/";

var names = [];

exports.index = function(req, res){
    request({
        url: url_company_names,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log(body) // Print the json response
            for (index = 0; index < body.length; ++index) {
                names.push({value:body[index]});
            }
        }
    })

    res.render('index', { test: 'Express' });
};


exports.api = function(req, res){

    var url_parts = url.parse(req.url, true);
    var query = url_parts.query.name;
    var result = _.filter(names, function(el){
        return (el.value.indexOf(query) > -1)
    });

    res.contentType('application/json');
    res.send(JSON.stringify(result));
};

exports.company = function(req, res){
    var url_parts = url.parse(req.url, true);
    var c_name = url_parts.query.name;
    console.log("name:"+c_name);
    var company_data = {};

    request({
        url: url_company+c_name,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log(body) // Print the json response
            company_data = body;
        }else{
            res.render('index', { test: 'Express' });
        }
    })
    console.log("COMPANYDATA: %j",company_data);


    res.render('company', { data: company_data });
};


