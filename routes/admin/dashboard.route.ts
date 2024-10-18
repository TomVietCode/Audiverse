import express, { Router } from "express"
const router: Router = express.Router()

import * as controller from "../../controllers/admin/dashboard.controller"

router.get("/", controller.index)

export const dashboardRoutes = router