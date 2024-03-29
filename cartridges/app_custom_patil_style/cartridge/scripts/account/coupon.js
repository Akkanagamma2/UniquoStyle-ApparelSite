'use strict';

function allCoupon(coupon){
        var StringUtils = require('dw/util/StringUtils');
        var Calendar = require('dw/util/Calendar');
        var service = require('*/cartridge/scripts/couponCode');

        var copouncode = service.coupounCodes(coupon.ID);
        var currentDate = new Date();
        var expDate = coupon.promotions[0].campaign.endDate;
        var startDate = coupon.promotions[0].campaign.startDate;
        var desc = coupon.promotions[0].getCalloutMsg().markup;
        var customerGroups = coupon.promotions[0].customerGroups;

        if(expDate > currentDate){
            if(startDate < currentDate){
                expDate = StringUtils.formatCalendar(new Calendar(expDate));
            }else{
                expDate = null;
            }
        }else{
            expDate = null;
        }

        var result = {
            couponId : copouncode.data[0].code,
            customerGroups : customerGroups,
            endDate : expDate,
            description : desc
        }
    return result;
}

module.exports.allCoupon = allCoupon;
