"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_slug_updater_1 = __importDefault(require("mongoose-slug-updater"));
mongoose_1.default.plugin(mongoose_slug_updater_1.default);
const songSchema = new mongoose_1.default.Schema({
    title: String,
    avatar: String,
    description: String,
    singerId: String,
    topicId: String,
    like: Array,
    lyrics: String,
    listens: {
        type: Number,
        default: 0
    },
    audio: String,
    status: String,
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
}, {
    timestamps: true,
});
const Song = mongoose_1.default.model("Song", songSchema, "songs");
exports.default = Song;
