"use strict";

var server = require("server");

var URLUtils = require('dw/web/URLUtils');


server.get("captcha",function(req,res,next){
    var scripts = require("*/cartridge/scripts/recaptcha");
    var subscribe = server.forms.getForm("recaptcha");
    res.render('custom/recaptcha',{
        subscribe : subscribe,
        resp : URLUtils.url('Recaptcha-httpRecaptcha'),

    });
    next();
});


server.post("response",function(req,res,next){

    var scripts = require("*/cartridge/scripts/recaptcha");
    // var google = require("https://www.google.com/recaptcha/api/siteverify");
    var subscribeForm = server.forms.getForm("recaptcha");
    var resp = req.form["g-recaptcha-response"];


    var resp = scripts.recaptchaResp(resp);
    var success = resp.statusCode;
    if(success == 200){
        return "Successfully implemented"
    }else{
        return "not implemented"
    }
    res.json(success);
     next();
})


server.post("httpRecaptcha",function(req,res,next){

    var Site = require('dw/system/Site');
    var HTTPClient = require('dw/net/HTTPClient');
    var Logger = require('dw/system/Logger');

    var subscribeForm = server.forms.getForm("recaptcha");
    var token = req.form["g-recaptcha-response"];
    var secret  = Site.getCurrent().getCustomPreferenceValue('v3recaptcha');

    if (!secret || empty(secret)) {
        Logger.error("recaptchaSecret value does not exist, set it in custom preferences.");
        return "ERROR: recaptchaSecret value does not exist, set it in custom preferences.";
    }

    // Request URL
    var url  = 'https://www.google.com/recaptcha/api/siteverify?secret=' + secret + '&response=' + token;

    var httpSvc  = new HTTPClient();
    httpSvc.setTimeout(5000);
    httpSvc.open("POST", url);
    httpSvc.send();

    var statuscode  = httpSvc.statusCode;
    var statusmsg  = httpSvc.statusMessage;
    var errorText  = httpSvc.errorText;

    if (httpSvc.statusCode == 200 || httpSvc.statusCode == 201) {
        var txt = JSON.parse(httpSvc.getText());
        if(txt.success == true){
            return JSON.parse(httpSvc.text);
        }else{
            Logger.error("Recaptcha Error " + txt["error-codes"]);
        }
    }else {
        Logger.error("Recaptcha Error - Data: " + JSON.stringify(httpSvc.text));
        Logger.error("Recaptcha Error - Response Status Code: " +  httpSvc.statusCode + " - Response Status: " + httpSvc.statusMessage);
        Logger.error("Recaptcha Error - Response Message: " + httpSvc.errorText);

         return "ERROR: STATUS CODE: " +  httpSvc.statusCode + " STATUS: " + httpSvc.statusMessage + " ERROR TEXT: " + httpSvc.errorText + "RESPONSE TEXT: " + JSON.stringify(httpSvc.text);
    }
    res.json(txt["error-codes"]);
    next();
});


module.exports = server.exports();