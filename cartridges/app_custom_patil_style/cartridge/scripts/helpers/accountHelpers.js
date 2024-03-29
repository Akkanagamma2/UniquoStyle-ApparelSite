'use strict';

var base = module.superModule;

/*Recaptcha Authentication */

function recaptchaResponseValidation(recaptchaResponse){
    var Service = require('dw/svc/Service');
    var Site = require('dw/system/Site');
    var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

    var secretkey = Site.getCurrent().getCustomPreferenceValue('v3recaptcha');

    var myrestapi = LocalServiceRegistry.createService("app_custom_patil_style.http.recaptchaValidation.post",{
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
    if (httpclient.statusCode == 200 || httpclient.statusCode == 201) {
        var text = JSON.parse(httpclient.text);
        if(text.success != true){
                var errorMessageKey = text["error-codes"];
                var errorMessage = errorMessageKey[0];

                return {
                    error: true,
                    errorMessage: errorMessage,
                    status: httpclient.statusCode,
                    authenticatedCustomer: null
                };
        }
        return{
            error:false,
            errorMessage:null
        }
    }
    return{
        error:false,
        errorMessage:null
    }
}

base.recaptchaResponseValidation = recaptchaResponseValidation;
module.exports = base;
