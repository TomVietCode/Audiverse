import express, { Router } from "express"
import * as controller from "../controllers/client/song.controller"

const router: Router = express.Router()

router.get("/:slugTopic", controller.list)

router.get("/detail/:slugSong", controller.detail)

router.patch("/like/:type/:songId", controller.like)

router.patch("/favourite/:type/:songId", controller.favourite)
export const songRoutes = router