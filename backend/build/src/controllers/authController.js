"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.logout = exports.me = exports.registerController = exports.loginController = void 0;
const utils_1 = require("../utils");
const argon2_1 = __importDefault(require("argon2"));
const user_1 = __importDefault(require("../../src/entity/user"));
const Yup = __importStar(require("yup"));
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const schema = Yup.object().shape({
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required"),
    });
    try {
        yield schema.validate({ username, password });
        let userExists = yield user_1.default.findOne({
            where: { username: username },
        });
        if (!userExists) {
            return (0, utils_1.sendError)({
                res,
                status: 404,
                message: "User not found",
            });
        }
        const isMatched = yield argon2_1.default.verify(userExists.password, password);
        if (!isMatched) {
            return (0, utils_1.sendError)({
                res,
                status: 401,
                message: "Invalid password",
            });
        }
        const authToken = (0, utils_1.generateToken)(userExists.username);
        yield (0, utils_1.setCookie)(res, authToken);
        return (0, utils_1.sendSuccess)({
            res,
            message: "Login successful",
            data: {
                username: userExists.username,
            },
        });
    }
    catch (error) {
        console.log(error);
        (0, utils_1.errorHandler)(res, error);
    }
});
exports.loginController = loginController;
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { first_name, last_name, email, username, password } = req.body;
    username = username.toLowerCase();
    const schema = Yup.object().shape({
        first_name: Yup.string().required("First name is required"),
        last_name: Yup.string().required("Last name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required"),
    });
    try {
        yield schema.validate({
            first_name,
            last_name,
            email,
            username,
            password,
        });
        let userExists = yield user_1.default.findOne({
            where: {
                username: username,
            },
        });
        if (userExists) {
            return (0, utils_1.sendError)({
                res,
                status: 400,
                message: "Username already taken",
            });
        }
        let emailExists = yield user_1.default.findOne({
            where: {
                email: email,
            },
        });
        if (emailExists) {
            return (0, utils_1.sendError)({
                res,
                status: 400,
                message: "Email already taken",
            });
        }
        const user = yield user_1.default.create({
            first_name,
            last_name,
            email,
            username,
            password,
        }).save();
        // login the user
        const authToken = (0, utils_1.generateToken)(user.username);
        yield (0, utils_1.setCookie)(res, authToken);
        return (0, utils_1.sendSuccess)({
            res,
            message: "User created successfully",
            data: {
                username: user.username,
            },
        });
    }
    catch (error) {
        console.log(error);
        (0, utils_1.errorHandler)(res, error);
    }
});
exports.registerController = registerController;
const me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    try {
        return (0, utils_1.sendSuccess)({
            res,
            message: "User data has been fetched successfully.",
            data: user,
        });
    }
    catch (error) {
        (0, utils_1.errorHandler)(res, error);
    }
});
exports.me = me;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, utils_1.removeCookie)(res);
        return (0, utils_1.sendSuccess)({
            res,
            message: "User has been logged out successfully.",
            data: null,
        });
    }
    catch (err) {
        (0, utils_1.errorHandler)(res, err);
    }
});
exports.logout = logout;
exports.default = {
    loginController: exports.loginController,
    registerController: exports.registerController,
    logout: exports.logout,
    me: exports.me,
};
//# sourceMappingURL=authController.js.map