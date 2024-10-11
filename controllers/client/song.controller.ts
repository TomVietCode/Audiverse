import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

// [GET] /songs/:slugTopic
export const list = async (req: Request, res: Response) => {
  try {
    const currentTopic = await Topic.findOne({
      slug: req.params.slugTopic,
      status: "active"
    })

    if(!currentTopic){
      res.redirect("/topics")
    }

    const songs = await Song.find({
      topicId: currentTopic._id,
      status: "active"
    })

    for (const song of songs) {
      const singerName = await Singer.findOne({
        _id: song.singerId
      }).select("name")

      song["singer"] = singerName
    }

    res.render("client/pages/songs/list", {
      pageTitle: currentTopic.title,
      songs: songs
    })
  } catch (error) {
    res.redirect("/topics")
  }
}