import express, { Router } from "express"
import * as controller from "../../controllers/client/song.controller"
import { requireAuth } from "../../middlewares/client/user.middleware"

const router: Router = express.Router()

router.get("/:slugTopic", controller.list)

router.get("/detail/:slugSong", controller.detail)

router.patch("/like/:type/:songId", requireAuth ,controller.like)

router.patch("/favourite/:type/:songId", requireAuth, controller.favourite)

export const songRoutes = router