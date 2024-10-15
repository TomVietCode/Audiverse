import { songRoutes } from "./song.route";
import { topicRoutes } from "./topic.route"
import { Express } from 'express';
import { userRoute } from "./user.route";
import { userInfo } from "../../middlewares/client/user.middleware";

const clientRoutes = (app: Express): void => {
  app.use(userInfo)
  
  app.use("/topics", topicRoutes)

  app.use("/songs", songRoutes)

  app.use("/user", userRoute)
}

export default clientRoutes