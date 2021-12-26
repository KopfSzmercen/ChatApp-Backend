import mongoose, { model, Model, Schema } from "mongoose";
import User from "../user";

interface Message {
  _id: string;
  senderId: mongoose.Types.ObjectId;
  senderName: string;
  text: string;
  createdAt: string;
  seenBy: string[];
  chatRoomId: string;
}

interface MessageModel extends Model<Message> {}

const messageSchema = new Schema<Message>(
  {
    senderId: [
      {
        type: mongoose.Types.ObjectId,
        ref: User
      }
    ],
    senderName: {
      type: String
    },
    text: {
      required: [true, "Message text is required"],
      type: String
    },
    seenBy: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    chatRoomId: { type: String }
  },
  {
    timestamps: true
  }
);

const Message = model<Message, MessageModel>("Message", messageSchema);

export default Message;
