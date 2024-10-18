import { Express } from 'express';
import { dashboardRoutes } from './dashboard.route';
import { topicRoutes } from './topic.route';
import { songRoutes } from './songs.route';

const adminRoutes = (app: Express): void => {
  const pathAdmin = "/admin"

  app.use(pathAdmin + "/dashboard", dashboardRoutes)

  app.use(pathAdmin + "/topics", topicRoutes)

  app.use(pathAdmin + "/songs", songRoutes)
}

export default adminRoutes