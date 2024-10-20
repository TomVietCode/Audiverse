"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const favSongSchema = new mongoose_1.default.Schema({
    userId: String,
    songId: String,
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date,
}, {
    timestamps: true,
});
const FavSong = mongoose_1.default.model("FavSong", favSongSchema, "favorite-songs");
exports.default = FavSong;
