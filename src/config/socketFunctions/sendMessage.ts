import { Server, Socket } from "socket.io";
import ChatRoom from "../../models/chatRoom";
import { NewMessagePayload } from "../socket";
import Message from "../../models/message";
import User from "../../models/user";

const sendMessage = async (
  data: NewMessagePayload,
  socket: Socket,
  io: Server
) => {
  const { senderId, roomId, text, senderName } = data;
  console.log(data);
  if (!senderId || !roomId || !text || !senderName)
    return socket.emit("error", "Invalid message data");
  try {
    const room = await ChatRoom.findOne({
      name: data.roomId,
      users: { $in: [data.senderId] }
    });
    if (!room)
      return socket.emit("error", "You don't have an access to this room!");

    const newMessage = await Message.create({
      senderId: data.senderId,
      chatRoomId: data.roomId,
      text: data.text,
      senderName: data.senderName,
      seenBy: [],
      createdAt: Date.now().toString()
    });
    await room.updateOne({ $push: { messages: newMessage._id } });
    //console.log("emitting");
    io.to(data.roomId).emit("new_message", newMessage);

    if (room.name !== "general_chat_room") {
      const secondUserId = room.users.find(
        (user) => user.toString() !== senderId
      );
      if (secondUserId) {
        const secondUser = await User.findOne({ _id: secondUserId });
        if (!secondUser) return;
        if (!secondUser.socketId || secondUser.socketId === "") return;
        io.to(secondUser.socketId).emit("received_message", senderId);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export default sendMessage;
