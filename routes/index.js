var url = require('url');
var _ = require('underscore');

var names = [];
/*
 * GET home page.
 */

exports.index = function(req, res){
    names = [
        { value: "test_remote" },
        { value: "test_remote2" },
        { value: "test_remote3" },
        { value: "ggg_remote" },
        { value: "mp_remote" }
    ]
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
    var query = url_parts.query.name;
    console.log("name:"+query);
    company_data =
    {
        name: "random_name",
        info:[
            {
                year:2010,
                k:{
                    k1: 1.2,
                    k2: 3,
                    k3: 0.5,
                    k4: 1.5,
                    k5: 1,
                    k6: 0.8,
                    k7: 2,
                    k8: 1,
                    k9: 3,
                    k10: 0.01,
                    k11: 0.5,
                    k12: 0.9,
                    k13: 2,
                    mark: 90
                }
            },
            {
                year:2011,
                k:{
                    k1: 1.1,
                    k2: 3,
                    k3: 0.5,
                    k4: 1.3,
                    k5: 1,
                    k6: 0.5,
                    k7: 1,
                    k8: 1,
                    k9: 2,
                    k10: 0.01,
                    k11: 0.4,
                    k12: 0.7,
                    k13: 1,
                    mark: 80
                }
            },
        ]
    }

    res.render('company', { data: company_data });
};