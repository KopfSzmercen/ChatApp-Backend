import User from "../../models/user";
import express from "express";
import { getTokenFromReq, verifyToken } from "../../auth/tokens";

const getAllUsers = async (req: express.Request, res: express.Response) => {
  const token = getTokenFromReq(req);
  if (!token) return res.status(403);

  const hasAccess = verifyToken(token);
  if (!hasAccess.success) return res.status(403);
  if (!hasAccess.userId || !hasAccess.username) return res.status(403);

  try {
    const users = await User.find().limit(10).sort("username");
    const formattedUsers: {
      id: string;
      username: string;
      isOnline: boolean;
    }[] = [];
    users.forEach((user) => {
      if (user._id.toString() !== hasAccess.userId!.toString()) {
        formattedUsers.push({
          id: user._id,
          username: user.username,
          isOnline: user.isOnline
        });
      }
    });

    return res.json({ success: true, users: formattedUsers });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

export default getAllUsers;
