import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  avatar: String,
  phone: String,
  authToken: String
}, {
  timestamps: true
})

const User = mongoose.model("User", userSchema, "users")

export default User