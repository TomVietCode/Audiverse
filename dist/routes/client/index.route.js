"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const song_route_1 = require("./song.route");
const topic_route_1 = require("./topic.route");
const user_route_1 = require("./user.route");
const user_middleware_1 = require("../../middlewares/client/user.middleware");
const search_route_1 = require("./search.route");
const clientRoutes = (app) => {
    app.use(user_middleware_1.userInfo);
    app.use("/topics", topic_route_1.topicRoutes);
    app.use("/songs", song_route_1.songRoutes);
    app.use("/user", user_route_1.userRoute);
    app.use("/search", search_route_1.searchRoute);
};
exports.default = clientRoutes;
