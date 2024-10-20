import express, { Router } from "express"
import multer from "multer"

import * as controller from "../../controllers/admin/song.controller"
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware"

const upload = multer()

const router: Router = express.Router()

router.get("/", controller.index)

router.get("/create", controller.create)

router.post(
  "/create",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  uploadCloud.uploadFields,
  controller.createPost
)

router.get("/edit/:songId", controller.edit)

router.patch(
  "/edit/:songId",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  uploadCloud.uploadFields,
  controller.editPatch
)
export const songRoutes = router
