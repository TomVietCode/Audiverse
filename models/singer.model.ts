import mongoose from "mongoose";

const singerSchema = new mongoose.Schema(
  {
    name: String,
    avatar: String,
    status: String,
    slug: String,
  },
  {
    timestamps: true,
  }
);
const Singer = mongoose.model("Singer", singerSchema, "singers");
export default Singer;