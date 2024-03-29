'use strict';

var COHelpers = require('*/cartridge/scripts/checkout/checkoutHelpers');

/**
 * Verifies the required information for billing form is provided.
 * @param {Object} req - The request object
 * @param {Object} paymentForm - the payment form
 * @param {Object} viewFormData - object contains billing form data
 * @returns {Object} an object that has error information or payment information
 */
function processForm(req, paymentForm, viewFormData){
    var array = require('*/cartridge/scripts/util/array');

    var viewData = viewFormData;
    var codErrors = {};

    if (!req.form.storedPaymentUUID) {
        // verify credit card form data
        codErrors = COHelpers.validateCreditCard(paymentForm);
    }

    if (Object.keys(codErrors).length) {
        return {
            fieldErrors: codErrors,
            error: true
        };
    }

    viewData.paymentMethod = {
        value: paymentForm.paymentMethod.value,
        htmlName: paymentForm.paymentMethod.value
    };

    viewData.paymentInformation = {
        captchaInput: {
            value: paymentForm.cashOnDeliveryFields.captchaInput.value,
            htmlName: paymentForm.cashOnDeliveryFields.captchaInput.htmlName
        },
        enteredCaptcha: {
            value: paymentForm.cashOnDeliveryFields.enteredCaptcha.value,
            htmlName: paymentForm.cashOnDeliveryFields.enteredCaptcha.htmlName
        }
    };

    if (req.form.storedPaymentUUID) {
        viewData.storedPaymentUUID = req.form.storedPaymentUUID;
    }

    return {
        error: false,
        viewData: viewData
    };
}

module.exports.processForm = processForm;
