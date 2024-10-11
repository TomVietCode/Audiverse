import { mongoose } from "mongoose"

const topicSchema = mongoose.Schema(
  {
    title: String,
    avatar: String,
    description: String,
    status: String,
    slug: String,
  },
  {
    timestamps: true,
  }
)

const Topic = mongoose.model("Topic", topicSchema, "topics")

export default Topic
