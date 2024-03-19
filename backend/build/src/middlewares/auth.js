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
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const entity_1 = require("../entity");
const utils_1 = require("../utils");
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield (0, utils_1.getToken)(req);
    if (!token) {
        return (0, utils_1.sendError)({
            res,
            status: 401,
            data: null,
            message: "Login is required to access this!",
        });
    }
    let decoded = jsonwebtoken_1.default.decode(token);
    if (!decoded.username) {
        return (0, utils_1.sendError)({
            res,
            status: 401,
            data: null,
            message: "Login is required to access this!",
        });
    }
    let user = yield entity_1.UserEntity.findOne({
        where: { username: decoded.username },
    });
    if (!user) {
        return (0, utils_1.sendError)({
            res,
            status: 401,
            data: null,
            message: "Login is required to access this!",
        });
    }
    req.user = user;
    next();
});
exports.protect = protect;
//# sourceMappingURL=auth.js.map