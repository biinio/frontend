#!/usr/bin/env node

var fs= require('fs'),
  http = require('http'),
  https = require('https'),
  util = require('util'),
	app = require('./biin_modules/app')();

//Define local vars
var isDevelopment = process.env.NODE_ENV === 'development';

//Https credentials
var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8').toString();;
var certificate = fs.readFileSync('sslcert/bundle.crt', 'utf8').toString();;
var credentials = {key: privateKey, cert: certificate};
var httpPort = process.env.PORT || 5000;
//Http Server instance
var httpServer = http.createServer(app).listen(httpPort,function(){
	console.log("Listing server");
});
