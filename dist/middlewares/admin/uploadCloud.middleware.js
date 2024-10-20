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
exports.uploadFields = exports.uploadSingle = exports.uploadToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const streamifier_1 = __importDefault(require("streamifier"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
let streamUpload = (buffer) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary_1.v2.uploader.upload_stream({
            resource_type: "auto"
        }, (error, result) => {
            if (result) {
                resolve(result);
            }
            else {
                reject(error);
            }
        });
        streamifier_1.default.createReadStream(buffer).pipe(stream);
    });
};
const uploadToCloudinary = (buffer) => __awaiter(void 0, void 0, void 0, function* () {
    let result = (yield streamUpload(buffer)) || "";
    return result["url"];
});
exports.uploadToCloudinary = uploadToCloudinary;
const uploadSingle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req["file"]) {
        const link = yield (0, exports.uploadToCloudinary)(req["file"].buffer);
        req.body[req["file"].fieldname] = link;
        next();
    }
    else {
        next();
    }
});
exports.uploadSingle = uploadSingle;
const uploadFields = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('oke');
    for (const key in req["files"]) {
        const links = [];
        for (const item of req["files"][key]) {
            try {
                const link = yield (0, exports.uploadToCloudinary)(item.buffer);
                links.push(link);
            }
            catch (error) {
                console.log(error);
            }
        }
        req.body[key] = links;
    }
    next();
});
exports.uploadFields = uploadFields;
