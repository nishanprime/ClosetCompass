"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = exports.TagController = exports.PostController = exports.ClothController = exports.AuthController = void 0;
const authController_1 = __importDefault(require("./authController"));
exports.AuthController = authController_1.default;
const clothController_1 = __importDefault(require("./clothController"));
exports.ClothController = clothController_1.default;
const postController_1 = __importDefault(require("./postController"));
exports.PostController = postController_1.default;
const tagController_1 = __importDefault(require("./tagController"));
exports.TagController = tagController_1.default;
const fileController_1 = __importDefault(require("./fileController"));
exports.FileController = fileController_1.default;
//# sourceMappingURL=index.js.map