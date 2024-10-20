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
exports.requireAuth = exports.userInfo = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const userInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.cookies.authToken) {
        const user = yield user_model_1.default.findOne({
            authToken: req.cookies.authToken
        }).select("_id fullName authToken");
        if (user) {
            res.locals.user = user;
        }
    }
    next();
});
exports.userInfo = userInfo;
const requireAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authToken = req.cookies.authToken;
    if (authToken) {
        const validUser = yield user_model_1.default.findOne({
            authToken: authToken
        }).select("_id fullName authToken");
        if (!validUser) {
            return;
        }
        res.locals.user = validUser;
        next();
    }
    else {
        res.json({
            code: 400
        });
        return;
    }
});
exports.requireAuth = requireAuth;
