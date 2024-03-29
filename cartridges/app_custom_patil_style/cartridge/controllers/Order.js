'use strict';

/**
 * @namespace Order
 */

var server = require('server');

server.extend(module.superModule);

var userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');

server.get('CreditPoints',
    userLoggedIn.validateLoggedIn,
    function(req,res,next){
        var List = require('dw/util/ArrayList');

        var orderList = new List();
        var orders = req.currentCustomer.raw.getOrderHistory().getOrders();
        while(orders.hasNext()){
            orderList.add(orders.next());
        }
        for(var i in orderList){
            var productq = orderList[i].getProductQuantities();
            var orderCredits = {
                orderNo : orderList[i].orderNo,
                productQuantity : orderList[i].getProductQuantities()
            }
        }
        res.json(orderCredits);
        next();
    }
);

module.exports = server.exports();
