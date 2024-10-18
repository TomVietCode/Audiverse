import mongoose from "mongoose"
import slug from "mongoose-slug-updater"
mongoose.plugin(slug)

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
    slug: {
      type: String,
      slug: "title",
      unique: true
    },
  },
  {
    timestamps: true,
  }
)

const Song = mongoose.model("Song", songSchema, "songs")

export default Song
