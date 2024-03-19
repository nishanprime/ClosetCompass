"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../middlewares/auth");
const index_1 = require("../controllers/index");
const express_1 = __importDefault(require("express"));
const uploadMiddleware_1 = __importDefault(require("../middlewares/uploadMiddleware"));
const FileRouter = express_1.default.Router();
FileRouter.route("/upload").post(auth_1.protect, (0, uploadMiddleware_1.default)("files"), index_1.FileController.uploadFiles);
FileRouter.route("/*").delete(auth_1.protect, index_1.FileController.deleteFileById);
FileRouter.route("/*").get(auth_1.protect, index_1.FileController.getFileById);
exports.default = FileRouter;
//# sourceMappingURL=file.js.map