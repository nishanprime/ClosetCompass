"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCookie = exports.setCookie = exports.getToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookie_1 = __importDefault(require("cookie"));
const generateToken = (username) => {
    return jsonwebtoken_1.default.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};
exports.generateToken = generateToken;
const getToken = (req) => {
    if (req.cookies && req.cookies[process.env.COOKIE_NAME]) {
        return req.cookies[process.env.COOKIE_NAME];
    }
    return null;
};
exports.getToken = getToken;
const setCookie = (res, token) => {
    const options = {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: "strict",
        path: "/",
    };
    res.setHeader("Set-Cookie", cookie_1.default.serialize(process.env.COOKIE_NAME, token, options));
};
exports.setCookie = setCookie;
const removeCookie = (res) => {
    const options = {
        httpOnly: true,
        secure: false,
        expires: new Date(0),
        sameSite: "strict",
        path: "/",
    };
    res.setHeader("Set-Cookie", cookie_1.default.serialize(process.env.COOKIE_NAME, "", options));
};
exports.removeCookie = removeCookie;
//# sourceMappingURL=token.js.map