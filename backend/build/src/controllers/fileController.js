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
exports.deleteFileById = void 0;
const entity_1 = require("../entity");
const utils_1 = require("../utils");
const path_1 = __importDefault(require("path"));
const helpers_1 = require("../../src/utils/helpers");
const uploadFiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const file = req.file;
        const relativePath = path_1.default.relative(".", req.file.path);
        let media;
        if (req.file) {
            const file = req.file;
            const relativePath = path_1.default.relative(".", req.file.path);
            media = yield entity_1.MediaEntity.create({
                relative_path: relativePath,
                media_type: file.mimetype.split("/")[1],
            }).save();
        }
        return (0, utils_1.sendSuccess)({
            res,
            status: 201,
            message: "Files uploaded successfully",
            data: Object.assign({}, media),
        });
    }
    catch (error) {
        return (0, utils_1.errorHandler)(res, error);
    }
});
const getFileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params[0];
        if (!id) {
            return (0, utils_1.sendError)({
                res,
                message: "Invalid file id",
                status: 400,
            });
        }
        const response = yield entity_1.MediaEntity.findOne({
            where: {
                id: parseInt(id),
            },
        });
        if (!response) {
            return (0, utils_1.sendError)({
                res,
                message: "File not found",
                status: 404,
            });
        }
        const { relative_path } = response;
        const fileUrl = `${process.env.API_URI}/${relative_path}`;
        // send buffer as inline
        res.setHeader("Content-Type", "image/png");
        return res.redirect(fileUrl);
    }
    catch (error) {
        return (0, utils_1.errorHandler)(res, error);
    }
});
const deleteFileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params[0];
    try {
        const file = yield entity_1.MediaEntity.findOne({
            where: {
                id: parseInt(id),
            },
        });
        if (!file) {
            return (0, utils_1.sendError)({
                res,
                message: "File not found",
                status: 404,
            });
        }
        const mediaId = file.id;
        if (mediaId) {
            yield (0, helpers_1.deleteMediaById)(mediaId);
        }
        yield file.remove();
        return (0, utils_1.sendSuccess)({
            res,
            status: 200,
            message: "File deleted successfully",
        });
    }
    catch (error) {
        return (0, utils_1.errorHandler)(res, error);
    }
});
exports.deleteFileById = deleteFileById;
exports.default = {
    uploadFiles,
    getFileById,
    deleteFileById: exports.deleteFileById,
};
//# sourceMappingURL=fileController.js.map