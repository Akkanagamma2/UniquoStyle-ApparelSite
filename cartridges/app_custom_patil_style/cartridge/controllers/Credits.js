'use strict';

var server = require('server');

var userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');


server.get('credit',userLoggedIn.validateLoggedIn,function(req,res,next){
    var Transaction = require('dw/system/Transaction');
    var CustomObjectMgr = require('dw/object/CustomObjectMgr');
    var lastCreditScore;

    var email = req.currentCustomer.raw.profile.email;
    var creditObject = CustomObjectMgr.getCustomObject('UniquoStyle_credits',email);

    Transaction.wrap(function(){
        if(!creditObject){
            creditObject = CustomObjectMgr.createCustomObject('UniquoStyle_credits',email);
        }
        lastCreditScore = creditObject.custom.credits;
        creditObject.custom.credits = creditObject.custom.credits + 25;
    });

    var credits = creditObject.custom.credits;



    // res.json({
    //     credit : credits});
    res.render('credits/uscredit',{
        credits : credits,
        lastCreditScore : lastCreditScore
    })
    next();
});

module.exports = server.exports();