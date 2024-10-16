import { Request, Response } from "express";
import Topic from "../../models/topic.model";

// [GET] /admin/topics
export const index = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    status: "active"
  })

  res.render("admin/pages/topics/index.pug", {
    pageTitle: "Quản lý chủ đề",
    topics: topics
  })
}