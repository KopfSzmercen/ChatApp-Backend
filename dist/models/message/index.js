"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var user_1 = __importDefault(require("../user"));
var messageSchema = new mongoose_1.Schema({
    senderId: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: user_1.default
        }
    ],
    senderName: {
        type: String
    },
    text: {
        required: [true, "Message text is required"],
        type: String
    },
    seenBy: [{ type: mongoose_1.default.Types.ObjectId, ref: "User" }],
    chatRoomId: { type: String }
}, {
    timestamps: true
});
var Message = mongoose_1.model("Message", messageSchema);
exports.default = Message;
