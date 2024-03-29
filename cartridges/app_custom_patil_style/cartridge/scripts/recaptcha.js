'use strict';

var Site = require('dw/system/Site');
var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

function recaptchaResp(recaptchaResponse){
    if(recaptchaResponse === undefined){
        throw new Error("Captcha not completed");
    }else{
       var secretkey = Site.getCurrent().getCustomPreferenceValue('Secret_key');

       var resp_google = "https://www.google.com/recaptcha/api/siteverify";

       var Service = require('dw/svc/Service');
        var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

    var myrestapi = LocalServiceRegistry.createService("app_custom_patil_style.http.validation.post",{
        createRequest: function(svc,secretKey,resp) {
            svc = svc.setRequestMethod("POST");
            var url = svc.getURL();
            svc = svc.setURL(url+"?secret="+secretKey+"&response="+resp);
            return '';
        },
        parseResponse : function(svc, response) {
            return response;
        }
    });

    var result = myrestapi.call(secretkey,recaptchaResponse);
    var httpclient = result.object;
    return httpclient;
    }

}



module.exports.recaptchaResp = recaptchaResp;