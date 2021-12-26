import { Socket } from "socket.io";
import ChatRoom from "../../models/chatRoom";
import crypto from "crypto";
import mongoose from "mongoose";

const formatId = (id: string) => new mongoose.Types.ObjectId(id);

const findRoom = async (user1Id: string, user2Id: string, socket: Socket) => {
  if (!user1Id || !user2Id)
    return socket.emit("error", "No user data provided");

  try {
    const room = await ChatRoom.findOne({
      name: { $ne: "general_chat_room" },
      users: { $all: [user1Id, user2Id] }
    });

    if (!room) {
      const newRoom = await ChatRoom.create({
        name: crypto.randomUUID(),
        users: [formatId(user1Id), formatId(user2Id)],
        messages: []
      });
      return socket.emit("returned_room_id", newRoom.name);
    }
    return socket.emit("returned_room_id", room.name);
  } catch (error) {
    return socket.emit("error", error);
  }
};

export default findRoom;
