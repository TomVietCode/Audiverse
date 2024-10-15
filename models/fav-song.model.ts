import mongoose from "mongoose";
const favSongSchema = new mongoose.Schema(
  {
    userId: String,
    songId: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);
const FavSong = mongoose.model("FavSong", favSongSchema, "favorite-songs");

export default FavSong;