"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_route_1 = require("./dashboard.route");
const topic_route_1 = require("./topic.route");
const songs_route_1 = require("./songs.route");
const adminRoutes = (app) => {
    const pathAdmin = "/admin";
    app.use(pathAdmin + "/dashboard", dashboard_route_1.dashboardRoutes);
    app.use(pathAdmin + "/topics", topic_route_1.topicRoutes);
    app.use(pathAdmin + "/songs", songs_route_1.songRoutes);
};
exports.default = adminRoutes;
