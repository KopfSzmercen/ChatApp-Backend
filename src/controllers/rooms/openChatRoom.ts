import express from "express";
import ChatRoom from "../../models/chatRoom";
import User from "../../models/user";
import createNewRoom from "./createNewRoom";

interface GetRoomBody extends express.Request {
  query: {
    user1Id?: string;
    user2Id?: string;
  };
}

const openChatRoom = async (req: GetRoomBody, res: express.Response) => {
  const { user1Id, user2Id } = req.query;
  if (!user1Id || !user2Id) return res.status(400);

  try {
    if (!user1Id || !user2Id) {
      return res.status(400);
    }

    const room = await ChatRoom.findOne({
      users: { $in: [user1Id, user2Id] }
    }).populate({
      path: "messages",
      options: { limit: 10 }
    });

    if (!room) {
      const newRoom = await createNewRoom(user1Id, user2Id);
      return res.json(newRoom);
    }

    return res.json(room);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

export default openChatRoom;
