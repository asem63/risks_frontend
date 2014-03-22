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