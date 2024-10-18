import express, { Router } from "express"
const router: Router = express.Router()

import * as controller from "../../controllers/admin/topic.controller"

router.get("/", controller.index)

export const topicRoutes = router