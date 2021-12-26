import express from "express";
import { getTokenFromReq, verifyToken } from "../../auth/tokens";
import User from "../../models/user";

const handleLogout = async (req: express.Request, res: express.Response) => {
  const token = getTokenFromReq(req);
  if (!token) return res.status(403);

  const hasAccess = verifyToken(token);
  if (!hasAccess.success) return res.status(403);
  if (!hasAccess.userId || !hasAccess.username) return res.status(403);

  try {
    const user = await User.findOne({ _id: hasAccess.userId });
    if (!user) return res.status(403);
    await user.updateOne({ isOnline: false });

    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    return res.json({ sucess: false });
  }
};

export default handleLogout;
