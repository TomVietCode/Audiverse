import express, { Router } from "express"
const router: Router = express.Router()

import * as controller from "../../controllers/client/search.controller"

router.get("/:type", controller.searchResult)

export const searchRoute = router