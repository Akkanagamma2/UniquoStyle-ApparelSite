'use strict';

var server = require('server');
var captcha = require('*/cartridge/scripts/cashDelivery/randomcaptcha');
var URLUtils = require('dw/web/URLUtils');

server.get('payment',function(req,res,next){
    var a = captcha.randomValue();
    res.render('checkout/billing/cashDelivery',{
        captcha : a,
        placeOrder : URLUtils.url('CashDelivery-placeOrder')
    });
    next();
})

server.post('placeOrder',function(req,res,next){
    var captcha = require('*/cartridge/scripts/cashDelivery/validateCaptcha');

    var captchainput = req.form["captcha"];
    var ReadCaptcha = req.form["Read-captcha"];

    var validationResult = captcha.validateRecaptcha(captchainput,ReadCaptcha);
    if(validationResult.error){
        res.json({
            error : [validationResult.errorMessage]
        })
    }else{
        res.json({
            error : [validationResult.errorMessage]
        })
    }
    next();
})

module.exports = server.exports();