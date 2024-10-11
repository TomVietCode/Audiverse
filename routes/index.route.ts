import { topicRoutes } from "./topic.route"
import { Express } from 'express';

const clientRoutes = (app: Express): void => {
  app.use("/topics", topicRoutes)
}

export default clientRoutes