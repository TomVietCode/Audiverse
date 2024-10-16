import mongoose from "mongoose"

const songSchema = new mongoose.Schema(
  {
    title: String,
    avatar: String,
    description: String,
    singerId: String,
    topicId: String,
    like: Array,
    lyrics: String,
    listens: {
      type: Number,
      default: 0
    },
    audio: String,
    status: String,
    slug: String,
  },
  {
    timestamps: true,
  }
)

const Song = mongoose.model("Song", songSchema, "songs")

export default Song
