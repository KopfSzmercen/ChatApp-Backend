"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenFromReq = exports.verifyToken = exports.generateToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
var TOKEN_SECRET = process.env.TOKEN_SECRET || "dfdsfdsfdsf";
var generateToken = function (username, userId) {
    var token = jsonwebtoken_1.default.sign({ username: username, userId: userId }, TOKEN_SECRET, {
        expiresIn: "40m"
    });
    return token;
};
exports.generateToken = generateToken;
var verifyToken = function (token) {
    var response = { success: true };
    jsonwebtoken_1.default.verify(token, TOKEN_SECRET, function (error, userData) {
        if (error) {
            response.success = false;
        }
        if (userData) {
            response.userId = userData.userId;
            response.username = userData.username;
        }
        else {
            response.success = false;
        }
    });
    return response;
};
exports.verifyToken = verifyToken;
var getTokenFromReq = function (req) {
    var _a;
    var authToken = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!authToken)
        return null;
    return authToken;
};
exports.getTokenFromReq = getTokenFromReq;
