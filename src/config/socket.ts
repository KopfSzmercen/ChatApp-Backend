import { Server } from "socket.io";
import findRoom from "./socketFunctions/findRoom";
import joinRoom from "./socketFunctions/joinRoom";
import {
  handleSocketLogin,
  handleSocketLogout
} from "./socketFunctions/logIn-Out";
import sendMessage from "./socketFunctions/sendMessage";

export interface JoinRoomPayload {
  userId: string;
  roomId: string;
  previousRoom: string;
}

export interface NewMessagePayload {
  senderId: string;
  roomId: string;
  text: string;
  senderName: string;
}

const configureIO = (io: Server) => {
  io.on("connection", (socket) => {
    //change user status to online
    socket.on("user_status_online", (userId: string) => {
      handleSocketLogin(socket, userId, io);
    });

    socket.on("join_room", (payload: JoinRoomPayload) => {
      joinRoom(payload.roomId, payload.userId, payload.previousRoom, socket);
    });

    socket.on("new_message", (data: NewMessagePayload) => {
      sendMessage(data, socket, io);
    });

    //when a user wants to change a room
    socket.on(
      "user_find_room",
      (data: { user1Id: string; user2Id: string }) => {
        findRoom(data.user1Id, data.user2Id, socket);
      }
    );

    //change user status to offline
    socket.on("disconnect", (userId: string) => {
      handleSocketLogout(socket, io);
    });
  });
};

export default configureIO;
