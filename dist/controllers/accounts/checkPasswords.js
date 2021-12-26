"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = __importDefault(require("validator"));
var checkPasswords = function (errors, password, confirmPassword) {
    if (!password || !confirmPassword) {
        errors.password = { message: "Password is required" };
    }
    else if (!validator_1.default.isLength(password, { min: 5, max: 15 }) ||
        !validator_1.default.isLength(confirmPassword, { min: 5, max: 15 })) {
        errors.password = {
            message: "Password has to be between 5 and 15 characters long."
        };
    }
    else if (password !== confirmPassword) {
        errors.password = { message: "Passwords do not match" };
    }
};
exports.default = checkPasswords;
