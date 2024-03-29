'use strict';

var Service = require('dw/svc/Service');
var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

function coupounCodes(coupounID){
    var clientId = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    var auth = authToken(clientId);
    var myrestapi = LocalServiceRegistry.createService("app_custom_uniquo.http.couponcode.get",{
        createRequest : function(svc,coupounID){
            svc.addHeader('Authorization','Bearer ' + auth.access_token);
            svc = svc.setRequestMethod("GET");
            var url = svc.getURL();
            svc = svc.setURL(url+"/"+coupounID+"/codes");
            return '';
        },
        parseResponse: function(svc,response){
            return response;
        }

    });

    var result = myrestapi.call(coupounID);

    if(result.isOk()){
        var httpClient = result.object;
        var ApiResponse = httpClient.getText();
        var ApiResponseJson = JSON.parse(ApiResponse);
        return ApiResponseJson;
    }else{
        return result.errorMessage;
    }
}

function authToken(clientId){
    var svc = LocalServiceRegistry.createService("app_custom_uniquo.http.oAuthtoken.post",{
        createRequest : function(svc,leurl){
            svc.addHeader('Content-Type',"application/x-www-form-urlencoded")
            svc.addHeader('Authorization', 'Basic ' + encodedAuthStr);
            svc.addHeader('Accept',"*/*");
            svc.addParam('grant_type',"urn:demandware:params:oauth:grant-type:client-id:dwsid:dwsecuretoken");
            svc = svc.setRequestMethod('POST');
            svc = svc.setURL(leurl);
            return '';
        },
        parseResponse : function(svc,response){
            return response;
        }
    });
    var config = svc.getConfiguration();
    var credentials = config.getCredential();
    var url = !empty(credentials.getURL()) ? credentials.getURL() : '';
    var user = credentials.getUser();
    var password = credentials.getPassword();
    var encodedAuthStr = require('dw/util/StringUtils').encodeBase64(user + ':' + password);
    var leurl = url+"?client_id="+clientId;
    var result = svc.call(leurl);

    if(result.isOk()){
        var httpClient = result.object;
        var ApiResponse = httpClient.getText();
        var ApiResponseJson = JSON.parse(ApiResponse);
        return ApiResponseJson;
    }else{
        return result.errorMessage;
    }

}

module.exports.coupounCodes = coupounCodes;
