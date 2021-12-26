import { Router } from "express";
import handleLogout from "../controllers/accounts/handleLogout";
import loginToAccount from "../controllers/accounts/login";
import registerUserAccount from "../controllers/accounts/register";
import openChatRoom from "../controllers/rooms/openChatRoom";
import getAllUsers from "../controllers/users/getAllUsers";

const router = Router();

router.post("/register", registerUserAccount);
router.post("/login", loginToAccount);
router.post("/logout", handleLogout);

router.get("/users", getAllUsers);
router.get("/room/", openChatRoom);

export default router;
