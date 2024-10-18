import { Express } from 'express';
import { dashboardRoutes } from './dashboard.route';
import { topicRoutes } from './topic.route';

const adminRoutes = (app: Express): void => {
  const pathAdmin = "/admin"

  app.use(pathAdmin + "/dashboard", dashboardRoutes)

  app.use(pathAdmin + "/topics", topicRoutes)
}

export default adminRoutes