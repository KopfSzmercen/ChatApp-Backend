import { Server, Socket } from "socket.io";
import User from "../../models/user";

export const handleSocketLogin = async (
  socket: Socket,
  userId: string,
  io: Server
) => {
  //console.log(`User ${userId} is online on socket: ${socket.id}`);
  /// find the user in the DB and change its status to online
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) return;
    await user.updateOne({ socketId: socket.id, isOnline: true });
    io.emit("user_status_online", userId);
  } catch (error) {
    console.log(error);
    socket.emit("error", error);
  }
};

export const handleSocketLogout = async (socket: Socket, io: Server) => {
  //console.log(`Disconnection ${socket.id}`);
  try {
    const user = await User.findOne({ socketId: socket.id });
    if (!user) return;
    await user.updateOne({ socketId: "", isOnline: false });
    io.emit("user_status_offline", user._id);
  } catch (error) {
    console.log(console.error);
    socket.emit("error", error);
  }
};
