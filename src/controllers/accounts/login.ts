import express from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import User from "../../models/user";
import { generateToken } from "../../auth/tokens/index";

interface LoginRequest extends express.Request {
  body: {
    email: string;
    password: string;
  };
}

interface LoginErrors {
  email?: { message: string };
  password?: { message: string };
  otherError?: { message: string };
}

const loginToAccount = async (req: LoginRequest, res: express.Response) => {
  const { email, password } = req.body;
  const loginErrors: LoginErrors = {};
  try {
    if (!email) loginErrors.email = { message: "Email is required" };
    else if (!validator.isEmail(email))
      loginErrors.email = { message: "Invalid email format" };
    if (!password) loginErrors.password = { message: "Password is required" };
    if (Object.keys(loginErrors).length !== 0) throw loginErrors;

    const user = await User.findOne({ email });
    if (!user) {
      loginErrors.email = { message: "No user with this email" };
      throw loginErrors;
    }
    const passwordsDoMatch = await bcrypt.compare(password, user.password);
    if (!passwordsDoMatch)
      loginErrors.password = { message: "Invalid password" };

    if (user.isOnline)
      loginErrors.otherError = {
        message: "Someone is already logged into the account"
      };
    if (Object.keys(loginErrors).length !== 0) throw loginErrors;

    await user.updateOne({ isOnline: true });

    const authToken = generateToken(user.username, user._id);
    return res.json({
      success: true,
      authToken: authToken,
      userId: user._id,
      username: user.username,
      chatRoomId: "chatRoomId"
    });
  } catch (errors) {
    return res.json({ success: false, errors: errors });
  }
};

export default loginToAccount;
