'use strict';

function validateRecaptcha(captchaInput,userCaptcha){
    if(userCaptcha!= undefined){
        if(captchaInput===userCaptcha){
            return{
                error : false,
                errorMessage : null
            }
        }else{
            return{
                error : true,
                errorMessage : "captcha is not matching"
            }
        }
    }else{
        return{
            error : true,
            errorMessage : "captcha is not entered"
        }
    }
}

module.exports.validateRecaptcha = validateRecaptcha;