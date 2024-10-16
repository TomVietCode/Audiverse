import { Request, Response } from "express"
import Topic from "../../models/topic.model"
import Song from "../../models/song.model"
import Singer from "../../models/singer.model"
import FavSong from "../../models/fav-song.model"

// [GET] /songs/:slugTopic
export const list = async (req: Request, res: Response) => {
  try {
    const currentTopic = await Topic.findOne({
      slug: req.params.slugTopic,
      status: "active",
    })

    if (!currentTopic) {
      res.redirect("/topics")
    }

    const songs = await Song.find({
      topicId: currentTopic._id,
      status: "active",
    })

    for (const song of songs) {
      const singer = await Singer.findOne({
        _id: song.singerId,
      }).select("name")

      song["singer"] = singer.name
    }

    res.render("client/pages/songs/list", {
      pageTitle: currentTopic.title,
      songs: songs,
    })
  } catch (error) {
    res.redirect("/topics")
  }
}

// [GET] /songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {
  const slugSong: string = req.params.slugSong
  try {
    const song = await Song.findOne({
      slug: slugSong,
      status: "active",
    })

    if (!song) {
      return res.redirect("back")
    }

    const [singer, topic, favSong] = await Promise.all([
      Singer.findOne({ _id: song.singerId }).select("name"),
      Topic.findOne({ _id: song.topicId }).select("title"),
      FavSong.findOne({ userId: res.locals.user.id, songId: song.id })
    ])

    res.render("client/pages/songs/detail", {
      pageTitle: song.title,
      song: song,
      singer: singer,
      topic: topic,
      favSong: favSong ? true : false,
    })
  } catch (error) {
    res.redirect("back")
  }
}

// [PATCH] /songs/like/:type/:songSlug
export const like = async (req: Request, res: Response) => {
  const isLike: boolean = req.params.type === "true" ? true : false

  const updatedSong = await Song.findOneAndUpdate(
    {
      _id: req.params.songId,
    },
    {
      [isLike ? "$push" : "$pull"]: { like: res.locals.user.id },
    },
    {
      new: true,
      select: "like",
    }
  )

  const totalLike = updatedSong ? updatedSong.like.length : "0"
  res.json({
    code: 200,
    totalLike: totalLike,
  })
}

// [PATCH] /songs/favorite/:type/:songId
export const favoritePatch = async (req: Request, res: Response) => {
  const isFav: boolean = req.params.type === "true" ? true : false

  if (isFav) {
    const record = new FavSong({
      userId: res.locals.user.id,
      songId: req.params.songId,
    })
    await record.save()
  } else {
    await FavSong.deleteOne({
      userId: res.locals.user.id,
      songId: req.params.songId,
    })
  }

  res.json({
    code: 200,
  })
}

// [GET] /songs/favorite
export const favSong = async (req: Request, res: Response) => {
  const favSongs = await FavSong.find({
    userId: res.locals.user.id
  }).lean()

  for (const item of favSongs) {
    const song = await Song.findOne({
      _id: item.songId
    }).select("avatar title slug singerId");

    const singer = await Singer.findOne({
      _id: song.singerId
    }).select("name");

    item["song"] = song;
    item["singer"] = singer;
  }

  res.render("client/pages/songs/favorite", {
    pageTitle: "Bài hát yêu thích", 
    favSongs: favSongs
  })
}
