'use strict';

var server = require('server');

server.get('List',function(req,res,next){
    var CouponMgr = require('dw/campaign/CouponMgr');
    var Coupon = require('*/cartridge/scripts/account/coupon');
    var StringUtils = require('dw/util/StringUtils');
    var Calendar = require('dw/util/Calendar');
    var couponList = new Array();

    if(req.currentCustomer.profile !== undefined){
        var currentCustomer = req.currentCustomer.profile.firstName + " " + req.currentCustomer.profile.lastName;
    }else{
        currentCustomer = "Guest User";
    }


    var customer = req.currentCustomer;
    var allCoupons = CouponMgr.getCoupons();

    for(var i in allCoupons){
        var couponObj = Coupon.allCoupon(allCoupons[i]);
        for(var i in couponObj.customerGroups){
            if(customer.raw.isMemberOfCustomerGroup(couponObj.customerGroups[i])){
                if(couponObj.endDate != null){
                    couponList.push(couponObj);
                }
                break;
            }
        }
    }


    res.render('coupons/coupon',{
        currentCustomer : currentCustomer,
        couponList : couponList
    });
    next();
});

module.exports = server.exports();