'use strict';

var server = require('server');

var googleCaptcha = require("https://www.google.com/recaptcha/api.js");

server.get('this',function(req,res,next){
    var CustomObjectMgr = require('dw/object/CustomObjectMgr');
    var object = CustomObjectMgr.describe('emailSubscribe22_patil');
    var attr = object.getAttributeDefinitions();
    var arr = new Array();
    for(var i in attr){
        arr.push(attr[i].ID);
    }
    res.json({
        aary:arr
    });
    next();
});

module.exports = server.exports();




