import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    full_name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    bio: {
      type: String,
      default: "Hey there! I am using Vibely. Join me on my journey to build a better world. 🌎",
    },
    profile_picture: { type: String, default: "" },
    cover_photo: { type: String, default: "" },
    location: { type: String, default: "" },
    followers: [{ type: String, ref: "User" }],
    following: [{ type: String, ref: "User" }],
    connections: [{ type: String, ref: "User" }],
  },
  { timestamps: true, minimize: false }
);

// Prevent re-compiling model in serverless hot-reloads
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;