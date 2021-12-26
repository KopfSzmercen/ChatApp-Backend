import mongoose, { model, Model, Schema } from "mongoose";
import validator from "validator";
import hasTheSameData from "./hasTheSameData";

interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  chatRooms: string[];
  isOnline: boolean;
  socketId: string;
}

interface UserModel extends Model<User> {}

const userSchema = new Schema<User>({
  username: {
    type: String,
    required: [true, "Username is required"],
    minlength: [5, "Username has to be at least 5 characters long"],
    maxlength: [15, "Username has to be max 15 characters long"],
    validate: {
      validator: async (value: string) => {
        const usernameIsUsed = await hasTheSameData("username", value);
        if (usernameIsUsed)
          throw new Error(
            "This username is already used. Please try another one"
          );
      }
    }
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: async (value: string) => {
        if (!validator.isEmail(value))
          throw new Error("Please enter a valid email");

        const emailIsUsed = await hasTheSameData("email", value);
        if (emailIsUsed)
          throw new Error("This email is already used. Please try another one");
      }
    }
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  isOnline: {
    type: Boolean
  },
  socketId: {
    type: String
  }
});

const User = model<User, UserModel>("User", userSchema);
export default User;
