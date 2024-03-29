'use strict';

var base = require('base/checkout/checkout');

var billingHelpers = require('./billing');

base.billingHelpers = billingHelpers;
module.exports = base;
