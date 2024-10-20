"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const singerSchema = new mongoose_1.default.Schema({
    name: String,
    avatar: String,
    status: String,
    slug: String,
}, {
    timestamps: true,
});
const Singer = mongoose_1.default.model("Singer", singerSchema, "singers");
exports.default = Singer;
