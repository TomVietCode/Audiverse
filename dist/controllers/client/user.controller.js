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
exports.logout = exports.loginPost = exports.login = exports.registerPost = exports.register = void 0;
const md5_1 = __importDefault(require("md5"));
const generate_helper_1 = require("../../helpers/generate.helper");
const user_model_1 = __importDefault(require("../../models/user.model"));
const register = (req, res) => {
    res.render("client/pages/users/register", {
        pageTitle: "Đăng ký"
    });
};
exports.register = register;
const registerPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
        res.redirect("back");
    }
    try {
        const existEmail = yield user_model_1.default.findOne({
            email: email
        });
        if (existEmail) {
            res.redirect("back");
            return;
        }
        const data = {
            fullName: fullName,
            email: email,
            password: (0, md5_1.default)(password)
        };
        const authToken = (0, generate_helper_1.generateRandomString)(30);
        data["authToken"] = authToken;
        const newUser = new user_model_1.default(data);
        yield newUser.save();
        res.cookie("authToken", authToken);
        res.redirect("/topics");
    }
    catch (error) {
        res.location("back");
    }
});
exports.registerPost = registerPost;
const login = (req, res) => {
    res.render("client/pages/users/login", {
        pageTitle: "Đăng nhập"
    });
};
exports.login = login;
const loginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.redirect("back");
        return;
    }
    const existUser = yield user_model_1.default.findOne({
        email: email
    });
    if (existUser) {
        if ((0, md5_1.default)(password) === existUser.password) {
            res.cookie("authToken", existUser.authToken);
            res.redirect("/topics");
            return;
        }
        res.redirect("back");
        return;
    }
    res.redirect("back");
});
exports.loginPost = loginPost;
const logout = (req, res) => {
    if (req.cookies.authToken) {
        res.clearCookie("authToken");
        res.redirect("back");
    }
};
exports.logout = logout;
