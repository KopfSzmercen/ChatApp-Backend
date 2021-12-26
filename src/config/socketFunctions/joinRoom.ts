import { Socket } from "socket.io";
import ChatRoom from "../../models/chatRoom";
import mongoose from "mongoose";

const joinRoom = async (
  roomId: string,
  userId: string,
  previousRoom: string,
  socket: Socket
) => {
  if (roomId === previousRoom) return;
  try {
    const room = await ChatRoom.findOne({
      name: roomId,
      users: { $in: [userId] }
    })
      .populate({
        path: "messages",
        options: {
          limit: 25
        }
      })
      .sort({ createdAt: -1 });

    if (!room) return;
    socket.leave(previousRoom);
    socket.join(roomId);

    if (roomId !== "general_chat_room") {
      const secondUserId = room.users.find(
        (user) => user.toString() !== userId.toString()
      );
      if (secondUserId) socket.emit("this_user_active", secondUserId);
    } else {
      socket.emit("this_user_active", "");
    }

    socket.emit("room_messages", room.messages);
  } catch (error) {
    console.log(error);
  }
};

export default joinRoom;
