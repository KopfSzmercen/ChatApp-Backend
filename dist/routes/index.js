"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var handleLogout_1 = __importDefault(require("../controllers/accounts/handleLogout"));
var login_1 = __importDefault(require("../controllers/accounts/login"));
var register_1 = __importDefault(require("../controllers/accounts/register"));
var openChatRoom_1 = __importDefault(require("../controllers/rooms/openChatRoom"));
var getAllUsers_1 = __importDefault(require("../controllers/users/getAllUsers"));
var router = express_1.Router();
router.post("/register", register_1.default);
router.post("/login", login_1.default);
router.post("/logout", handleLogout_1.default);
router.get("/users", getAllUsers_1.default);
router.get("/room/", openChatRoom_1.default);
exports.default = router;
