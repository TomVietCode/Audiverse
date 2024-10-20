import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import Topic from "../../models/topic.model";

// [GET] /admin/songs
export const index = async (req: Request, res: Response) => {
  const songs = await Song.find({
    status: "active"
  })

  res.render("admin/pages/songs/index.pug", {
    pageTitle: "Quản lý bài hát",
    songs: songs
  })
}

// [GET] /admin/songs/create
export const create = async (req: Request, res: Response) => {
  const [singers, topics] = await Promise.all([
    Singer.find({ status: "active" }).select("name"),
    Topic.find({ status: "active" }).select("title")
  ])

  res.render("admin/pages/songs/create.pug", {
    pageTitle: "Thêm bài hát mới",
    singers: singers,
    topics: topics
  })
}

// [POST] /admin/songs/create
export const createPost = async (req: Request, res: Response) => {
  if(req.body.avatar) {
    req.body.avatar = req.body.avatar[0];
  }
  if(req.body.audio) {
    req.body.audio = req.body.audio[0];
  }

  const song = new Song(req.body);
  await song.save();

  res.redirect("back")
}

// [GET] /admin/songs/edit/:songId
export const edit = async (req: Request, res: Response) => {
  const songId: string = req.params.songId

  const [song, topics, singers] = await Promise.all([
    Song.findOne({ _id: songId }),
    Topic.find({ status: "active" }).select("title"),
    Singer.find({ status: "active" }).select("name")
  ])

  res.render("admin/pages/songs/edit", {
    pageTitle: "Chỉnh sửa bài hát",
    song: song,
    topics: topics,
    singers: singers
  })
}

// [PATCH] /admin/songs/edit/:songId
export const editPatch = async (req: Request, res: Response) => {
  const songId: string = req.params.songId

  if(req.body.avatar) {
    req.body.avatar = req.body.avatar[0];
  }
  if(req.body.audio) {
    req.body.audio = req.body.audio[0];
  }

  console.log(req.body)
  await Song.updateOne({
    _id: songId
  }, req.body)

  res.redirect("back")
}