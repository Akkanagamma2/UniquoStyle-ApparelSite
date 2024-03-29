'use strict';
var base = require('base/checkout/billing');

function updatePaymentInformation(order) {
    // update payment details
    var $paymentSummary = $('.payment-details');
    var htmlToAppend = '';

    if (order.billing.payment && order.billing.payment.selectedPaymentInstruments
        && order.billing.payment.selectedPaymentInstruments.length > 0) {
            if(order.billing.payment.selectedPaymentInstruments[0].paymentMethod === 'CREDIT_CARD'){
                htmlToAppend += '<span>' + order.resources.cardType + ' '
            + order.billing.payment.selectedPaymentInstruments[0].type
            + '</span><div>'
            + order.billing.payment.selectedPaymentInstruments[0].maskedCreditCardNumber
            + '</div><div><span>'
            + order.resources.cardEnding + ' '
            + order.billing.payment.selectedPaymentInstruments[0].expirationMonth
            + '/' + order.billing.payment.selectedPaymentInstruments[0].expirationYear
            + '</span></div>';
            }else if(order.billing.payment.selectedPaymentInstruments[0].paymentMethod === 'CASH_ON_DELIVERY'){
                htmlToAppend += '<span>'+order.billing.payment.selectedPaymentInstruments[0].paymentMethod+'</span><div>'
            }
    }
    $paymentSummary.empty().append(htmlToAppend);
}

base.updatePaymentInformation = updatePaymentInformation;
module.exports = base;

