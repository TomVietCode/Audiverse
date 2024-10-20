"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listenPatch = exports.favSong = exports.favoritePatch = exports.like = exports.detail = exports.list = void 0;
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const fav_song_model_1 = __importDefault(require("../../models/fav-song.model"));
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentTopic = yield topic_model_1.default.findOne({
            slug: req.params.slugTopic,
            status: "active",
        });
        if (!currentTopic) {
            res.redirect("/topics");
        }
        const songs = yield song_model_1.default.find({
            topicId: currentTopic._id,
            status: "active",
        });
        for (const song of songs) {
            const singer = yield singer_model_1.default.findOne({
                _id: song.singerId,
            }).select("name");
            song["singer"] = singer.name;
        }
        res.render("client/pages/songs/list", {
            pageTitle: currentTopic.title,
            songs: songs,
        });
    }
    catch (error) {
        res.redirect("/topics");
    }
});
exports.list = list;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slugSong = req.params.slugSong;
    try {
        const song = yield song_model_1.default.findOne({
            slug: slugSong,
            status: "active",
        });
        if (!song) {
            return res.redirect("back");
        }
        const [singer, topic, favSong] = yield Promise.all([
            singer_model_1.default.findOne({ _id: song.singerId }).select("name"),
            topic_model_1.default.findOne({ _id: song.topicId }).select("title"),
            fav_song_model_1.default.findOne({ userId: res.locals.user.id, songId: song.id }),
        ]);
        res.render("client/pages/songs/detail", {
            pageTitle: song.title,
            song: song,
            singer: singer,
            topic: topic,
            favSong: favSong ? true : false,
        });
    }
    catch (error) {
        res.redirect("back");
    }
});
exports.detail = detail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isLike = req.params.type === "true" ? true : false;
    const updatedSong = yield song_model_1.default.findOneAndUpdate({
        _id: req.params.songId,
    }, {
        [isLike ? "$push" : "$pull"]: { like: res.locals.user.id },
    }, {
        new: true,
        select: "like",
    });
    const totalLike = updatedSong ? updatedSong.like.length : "0";
    res.json({
        code: 200,
        totalLike: totalLike,
    });
});
exports.like = like;
const favoritePatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isFav = req.params.type === "true" ? true : false;
    if (isFav) {
        const record = new fav_song_model_1.default({
            userId: res.locals.user.id,
            songId: req.params.songId,
        });
        yield record.save();
    }
    else {
        yield fav_song_model_1.default.deleteOne({
            userId: res.locals.user.id,
            songId: req.params.songId,
        });
    }
    res.json({
        code: 200,
    });
});
exports.favoritePatch = favoritePatch;
const favSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const favSongs = yield fav_song_model_1.default.find({
        userId: res.locals.user.id,
    }).lean();
    for (const item of favSongs) {
        const song = yield song_model_1.default.findOne({
            _id: item.songId,
        }).select("avatar title slug singerId");
        const singer = yield singer_model_1.default.findOne({
            _id: song.singerId,
        }).select("name");
        item["song"] = song;
        item["singer"] = singer;
    }
    res.render("client/pages/songs/favorite", {
        pageTitle: "Bài hát yêu thích",
        favSongs: favSongs,
    });
});
exports.favSong = favSong;
const listenPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songId = req.params.songId;
    try {
        const totalListen = yield song_model_1.default.findOneAndUpdate({
            _id: songId,
        }, {
            $inc: { listens: 1 },
        }, {
            new: true,
            select: "listens",
        });
        if (totalListen) {
            res.json({
                code: 200,
                listens: totalListen.listens
            });
        }
    }
    catch (error) {
        res.redirect("back");
    }
});
exports.listenPatch = listenPatch;
