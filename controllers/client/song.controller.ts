import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import FavSong from "../../models/fav-song.model";

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
      const singer = await Singer.findOne({
        _id: song.singerId
      }).select("name")

      song["singer"] = singer.name
    }

    res.render("client/pages/songs/list", {
      pageTitle: currentTopic.title,
      songs: songs
    })
  } catch (error) {
    res.redirect("/topics")
  }
}

// [GET] /song/detail/:slugSong
export const detail = async (req: Request, res: Response) => {
  const slugSong: string = req.params.slugSong
  try {
    const song = await Song.findOne({
      slug: slugSong,
      status: "active"
    })

    const singer = await Singer.findOne({
      _id: song.singerId
    }).select("name")
  
  
    const topic = await Topic.findOne({
      _id: song.topicId
    }).select("title")
  
    const favSong = await FavSong.findOne({ userId: "", songId: song._id }) ? true : false

    res.render("client/pages/songs/detail", {
      pageTitle: song.title,
      song: song,
      singer: singer,
      topic: topic,
      favSong: favSong
    })
  } catch (error) {
    res.redirect("back")
  }
}

// [PATCH] /song/like/:type/:songSlug
export const like = async (req: Request, res: Response) => {
  const isLike: boolean = req.params.type === "true" ? true : false

  console.log(res.locals.user)
  await Song.updateOne({
    _id: req.params.songId
  }, {
    $inc: {like: isLike ? 1 : -1}
  })

  const totalLike = await Song.findOne({
    _id: req.params.songId
  }).select("like")

  res.json({
    code: 200,
    totalLike: totalLike.like
  })
}

// [PATCH] /song/favourite/:type/:songId
export const favourite = async (req: Request, res: Response) => {
  const isFav: boolean = req.params.type === "true" ? true : false

  if(isFav) {
    const record = new FavSong({
      userId: "",
      songId: req.params.songId
    })
    await record.save()
  } else {
    await FavSong.deleteOne({
      userId: "",
      songId: req.params.songId
    })
  }

  res.json({
    code: 200
  })
}