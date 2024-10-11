import { songRoutes } from "./song.route";
import { topicRoutes } from "./topic.route"
import { Express } from 'express';

const clientRoutes = (app: Express): void => {
  app.use("/topics", topicRoutes)

  app.use("/songs", songRoutes)
}

export default clientRoutes