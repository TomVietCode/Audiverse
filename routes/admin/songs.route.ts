import express, { Router } from "express"
import multer from "multer"

import * as controller from "../../controllers/admin/song.controller"
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware";

const upload = multer()

const router: Router = express.Router()

router.get("/", controller.index)

router.get("/create", controller.create)

router.post("/create", upload.fields(
  [
    { name: 'avatar', maxCount: 1 },
    { name: 'audio', maxCount: 1 }
  ]
), uploadCloud.uploadSingle, controller.createPost)

export const songRoutes = router