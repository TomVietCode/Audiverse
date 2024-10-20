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
exports.editPatch = exports.edit = exports.createPost = exports.create = exports.index = void 0;
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield song_model_1.default.find({
        status: "active"
    });
    res.render("admin/pages/songs/index.pug", {
        pageTitle: "Quản lý bài hát",
        songs: songs
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [singers, topics] = yield Promise.all([
        singer_model_1.default.find({ status: "active" }).select("name"),
        topic_model_1.default.find({ status: "active" }).select("title")
    ]);
    res.render("admin/pages/songs/create.pug", {
        pageTitle: "Thêm bài hát mới",
        singers: singers,
        topics: topics
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.avatar) {
        req.body.avatar = req.body.avatar[0];
    }
    if (req.body.audio) {
        req.body.audio = req.body.audio[0];
    }
    const song = new song_model_1.default(req.body);
    yield song.save();
    res.redirect("back");
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songId = req.params.songId;
    const [song, topics, singers] = yield Promise.all([
        song_model_1.default.findOne({ _id: songId }),
        topic_model_1.default.find({ status: "active" }).select("title"),
        singer_model_1.default.find({ status: "active" }).select("name")
    ]);
    res.render("admin/pages/songs/edit", {
        pageTitle: "Chỉnh sửa bài hát",
        song: song,
        topics: topics,
        singers: singers
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songId = req.params.songId;
    if (req.body.avatar) {
        req.body.avatar = req.body.avatar[0];
    }
    if (req.body.audio) {
        req.body.audio = req.body.audio[0];
    }
    console.log(req.body);
    yield song_model_1.default.updateOne({
        _id: songId
    }, req.body);
    res.redirect("back");
});
exports.editPatch = editPatch;
