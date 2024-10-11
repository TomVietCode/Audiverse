import express, { Router } from "express"
import * as controller from "../controllers/topic.controller"
const router: Router = express.Router()

router.get("/", controller.index)

export const topicRoutes = router