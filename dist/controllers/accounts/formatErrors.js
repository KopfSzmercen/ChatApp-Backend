"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var formatErrors = function (errors) {
    var formattedError = {};
    if (errors.password) {
        formattedError.password = { message: errors.password.message };
    }
    if (errors.confirmPassword) {
        formattedError.confirmPassword = {
            message: errors.confirmPassword.message
        };
    }
    if (errors.email) {
        formattedError.email = { message: errors.email.message };
    }
    if (errors.username) {
        formattedError.username = { message: errors.username.message };
    }
    return formattedError;
};
exports.default = formatErrors;
