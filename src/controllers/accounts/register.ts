import User from "../../models/user";
import bcrypt from "bcrypt";
import express from "express";
import checkPasswords from "./checkPasswords";
import formatErrors from "./formatErrors";
import ChatRoom from "../../models/chatRoom";
import mongoose from "mongoose";

interface RegisterRequest extends express.Request {
  body: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
}

export interface RegisterErrors {
  username?: { message: string };
  email?: { message: string };
  password?: { message: string };
  confirmPassword?: { message: string };
  errors?: { [key: string]: string };
}

const registerUserAccount = async (
  req: RegisterRequest,
  res: express.Response
) => {
  const { password, confirmPassword } = req.body;
  const errors: RegisterErrors = {};
  try {
    checkPasswords(errors, password, confirmPassword);
    if (Object.keys(errors).length !== 0) throw errors;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      ...req.body,
      password: hashedPassword,
      isOnline: false,
      socketId: ""
    });

    const generalChatRoom = await ChatRoom.findOne({
      name: "general_chat_room"
    });
    if (!generalChatRoom) {
      await ChatRoom.create({
        users: [new mongoose.Types.ObjectId(user._id)],
        name: "general_chat_room",
        messages: []
      });
    } else {
      await generalChatRoom.updateOne({ $push: { users: user._id } });
    }

    return res.json({ success: true });
  } catch (error) {
    const errors = error as RegisterErrors;
    const formattedErrors = formatErrors(errors.errors || errors);
    return res.json({ success: false, errors: { ...formattedErrors } });
  }
};

export default registerUserAccount;
