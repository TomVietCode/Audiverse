import express, { Router } from "express"
import * as controller from "../../controllers/client/song.controller"
import { requireAuth } from "../../middlewares/client/user.middleware"

const router: Router = express.Router()

router.get("/favorite", requireAuth, controller.favSong)

router.get("/detail/:slugSong", controller.detail)

router.patch("/like/:type/:songId", requireAuth ,controller.like)

router.patch("/favorite/:type/:songId", requireAuth, controller.favoritePatch)

router.patch("/listen/:songId", controller.listenPatch)

router.get("/:slugTopic", controller.list)

export const songRoutes = router