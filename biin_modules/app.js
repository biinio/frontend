module.exports = function () {
    var express = require('express')
    , fs = require('fs')
    , http = require('http')
    , https = require('https')
    , path = require('path')
    , app = express()
    , favicon = require('serve-favicon')
    , cors = require('cors');

    var compress = require('compression');
    //app.use(compress());

    var isDevelopment = process.env.NODE_ENV === 'development';

    //app.use(cors());

    app.set('port', process.env.PORT || 5000);

    // At the top of your web.js
    process.env.PWD = process.cwd();

    //SSL Force Confifuration
    var forceSsl = function (req, res, next) {
        if (!req.secure) {
            return res.redirect(['https://', req.get('Host'), req.url].join(''));
        } else {
            next();
        }
    };

    app.use(express.static(path.join(process.env.PWD , 'public')));
    app.use('/business', express.static(path.join(process.env.PWD , 'business')));

    app.use(favicon(__dirname + '/../public/favicon.ico'));
    console.log("app running");

    return app;
};
