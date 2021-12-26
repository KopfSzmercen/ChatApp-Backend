"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var findRoom_1 = __importDefault(require("./socketFunctions/findRoom"));
var joinRoom_1 = __importDefault(require("./socketFunctions/joinRoom"));
var logIn_Out_1 = require("./socketFunctions/logIn-Out");
var sendMessage_1 = __importDefault(require("./socketFunctions/sendMessage"));
var configureIO = function (io) {
    io.on("connection", function (socket) {
        socket.on("user_status_online", function (userId) {
            logIn_Out_1.handleSocketLogin(socket, userId, io);
        });
        socket.on("join_room", function (payload) {
            joinRoom_1.default(payload.roomId, payload.userId, payload.previousRoom, socket);
        });
        socket.on("new_message", function (data) {
            sendMessage_1.default(data, socket, io);
        });
        socket.on("user_find_room", function (data) {
            findRoom_1.default(data.user1Id, data.user2Id, socket);
        });
        socket.on("disconnect", function (userId) {
            logIn_Out_1.handleSocketLogout(socket, io);
        });
    });
};
exports.default = configureIO;
