var url = require('url');
var _ = require('underscore');
var request = require('request');

var url_company_names = "http://finance-kpirisk.rhcloud.com/rest/risk/corporations";
var url_company = "http://finance-kpirisk.rhcloud.com/rest/risk/data/";
var url_company_generate = "http://finance-kpirisk.rhcloud.com/rest/risk/generate";

var names = [];

exports.index = function(req, res){
    request({
        url: url_company_names,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            names=[];
            for (index = 0; index < body.length; ++index) {
                names.push({value:body[index]});
            }
        }
    })

    res.render('index');
};

exports.company_list = function(req, res){
    request({
        url: url_company_names,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            names=[];
            for (index = 0; index < body.length; ++index) {
                names.push({value:body[index]});
            }
            res.render('company_list',{ data: names });
        }
    })


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
            company_data = body;
            for (index = 0; index < company_data.result.length; ++index) {
                company_data.result[index].corporationClass.result = parseFloat(company_data.result[index].corporationClass.result).toFixed(2);
                company_data.result[index].calculationResult.t21 = parseFloat(company_data.result[index].calculationResult.t21).toFixed(2);
                company_data.result[index].calculationResult.t22 = parseFloat(company_data.result[index].calculationResult.t22).toFixed(2);
                company_data.result[index].calculationResult.t23 = parseFloat(company_data.result[index].calculationResult.t23).toFixed(2);
                company_data.result[index].calculationResult.t24 = parseFloat(company_data.result[index].calculationResult.t24).toFixed(2);
                company_data.result[index].calculationResult.t25 = parseFloat(company_data.result[index].calculationResult.t25).toFixed(2);
                company_data.result[index].calculationResult.t26 = parseFloat(company_data.result[index].calculationResult.t26).toFixed(2);
                company_data.result[index].calculationResult.t31 = parseFloat(company_data.result[index].calculationResult.t31).toFixed(2);
                company_data.result[index].calculationResult.t32 = parseFloat(company_data.result[index].calculationResult.t32).toFixed(2);
                company_data.result[index].calculationResult.t33 = parseFloat(company_data.result[index].calculationResult.t33).toFixed(2);
                company_data.result[index].calculationResult.t34 = parseFloat(company_data.result[index].calculationResult.t34).toFixed(2);
            }
            res.render('company', { data: company_data });
        }else{
            res.render('index');
        }
    })

};

exports.add_company = function(req, res){
    res.render('add_company');
};

exports.add_company_post = function(req, res){
    var url_parts = url.parse(req.url, true);
    var json_response =
    {
        companyName:url_parts.query.name,
        info:
            [
                {year:url_parts.query.year1, c_class:url_parts.query.class1},
                {year:url_parts.query.year2, c_class:url_parts.query.class2},
                {year:url_parts.query.year3, c_class:url_parts.query.class3},
                {year:url_parts.query.year4, c_class:url_parts.query.class4},
                {year:url_parts.query.year5, c_class:url_parts.query.class5}
            ]
    };

    var options = {
        uri: url_company_generate,
        method: 'POST',
        json: json_response
    };

    request(options, function callback(error, response, body) {
        if (!error) {
            var info = JSON.parse(JSON.stringify(body));
            console.log(info);
        }
        else {
            console.log('Error happened: '+ error);
        }
    });

    res.render('index');
};

