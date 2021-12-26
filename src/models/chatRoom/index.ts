import mongoose, { model, Model, Schema } from "mongoose";
import Message from "../message";

interface ChatRoomBase {
  _id: string;
  users: string[];
  messages: string[];
  name: string;
}

interface ChatRoomModel extends Model<ChatRoomBase> {}

const chatRoomSchema = new Schema({
  name: String,
  users: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User"
    }
  ],
  messages: [{ type: mongoose.Types.ObjectId, ref: Message }]
});

const ChatRoom = model<ChatRoomBase, ChatRoomModel>("ChatRoom", chatRoomSchema);
export default ChatRoom;
