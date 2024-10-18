import { Request, Response } from "express";
import Song from "../../models/song.model";

// [GET] /admin/topics
export const index = async (req: Request, res: Response) => {
  const songs = await Song.find({
    status: "active"
  })

  res.render("admin/pages/songs/index.pug", {
    pageTitle: "Quản lý chủ đề",
    songs: songs
  })
}