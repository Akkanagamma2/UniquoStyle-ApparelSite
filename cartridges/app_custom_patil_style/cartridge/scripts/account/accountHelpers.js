'use strict';

var base = module.superModule;

/**
 * Creates an account model for the current customer
 * @param {Object} req - local instance of request object
 * @returns {Object} a plain object of the current customer's account
 */
function getAccountModel(req) {
    var AccountModel = require('*/cartridge/models/account');
    var AddressModel = require('*/cartridge/models/address');
    var orderHelpers = require('*/cartridge/scripts/order/orderHelpers');

    var StringUtils = require('dw/util/StringUtils');
    var Calendar = require('dw/util/Calendar');

    var preferredAddressModel;

    if (!req.currentCustomer.profile) {
        return null;
    }

    var orderModel = orderHelpers.getLastOrder(req);

    if (req.currentCustomer.addressBook.preferredAddress) {
        preferredAddressModel = new AddressModel(req.currentCustomer.addressBook.preferredAddress);
    } else {
        preferredAddressModel = null;
    }

    return new AccountModel(req.currentCustomer, preferredAddressModel, orderModel);
}

base.getAccountModel = getAccountModel;
module.exports = base;

