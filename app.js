
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = require('express')(),
    swig = require('swig'),
    people;

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

// all environments
app.set('port', server_port);

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(app.router);
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
// Handle 404
app.use(function(req, res) {
    res.status(404);
    res.render('error.html', {title: '404: Not Found', error: 404});
});

// Handle 500
app.use(function(error, req, res, next) {
    res.status(500);
    res.render('error.html', {title:'500: Internal Server Error', error: error});
});
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/js/api', routes.api);
app.get('/company', routes.company);
app.get('/add_company', routes.add_company);
app.get('/all_companies', routes.company_list);
app.get('/users', user.list);

app.post('/add_company_post', routes.add_company_post);




http.createServer(app).listen(app.get('port'), server_ip_address,function(){
  console.log('Express server listening on port ' + app.get('port'));
});
