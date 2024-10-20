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
exports.searchResult = void 0;
const unidecode_1 = __importDefault(require("unidecode"));
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const searchResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.params.type;
    const keyword = `${req.query.keyword}`;
    try {
        if (keyword) {
            const decodeKeyword = (0, unidecode_1.default)(keyword).trim();
            const slugKeyword = decodeKeyword.replace(/\s+/g, "-");
            const regex = new RegExp(slugKeyword, "i");
            const songResult = yield song_model_1.default.find({
                slug: regex
            }).select("title singerId avatar slug like").lean();
            if (songResult.length > 0) {
                for (const song of songResult) {
                    const singer = yield singer_model_1.default.findOne({
                        _id: song.singerId
                    }).select("name");
                    song["singer"] = (singer === null || singer === void 0 ? void 0 : singer.name) || "No data";
                }
            }
            switch (type) {
                case "result":
                    res.render("client/pages/search/result", {
                        pageTitle: `Tìm kiếm: ${keyword}`,
                        keyword: keyword,
                        result: songResult
                    });
                    break;
                case "suggest":
                    res.json({
                        code: 200,
                        suggests: songResult
                    });
                    break;
                default:
                    break;
            }
        }
    }
    catch (error) {
        res.redirect("back");
    }
});
exports.searchResult = searchResult;
