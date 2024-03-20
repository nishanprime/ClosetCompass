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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTag = exports.getAllTags = void 0;
const utils_1 = require("../utils");
const entity_1 = require("../entity");
const Yup = __importStar(require("yup"));
const getAllTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tags = yield entity_1.TagEntity.createQueryBuilder("tag")
            .where("tag.user_id = :id", { id: req.user.id }).getMany();
        return (0, utils_1.sendSuccess)({
            res,
            message: "Tags fetched successfully",
            data: tags,
        });
    }
    catch (error) {
        console.log(error);
        (0, utils_1.errorHandler)(res, error);
    }
});
exports.getAllTags = getAllTags;
const addTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tag } = req.body;
    const schema = Yup.object().shape({
        tag: Yup.string().required("Please enter the tag name"),
    });
    try {
        yield schema.validate({ tag });
        const current_user = req.user;
        const new_tag = yield entity_1.TagEntity.create({
            user_id: current_user.id,
            tag_name: tag,
        }).save();
        return (0, utils_1.sendSuccess)({
            res,
            message: "Tag added successfully",
            data: Object.assign({}, new_tag),
        });
    }
    catch (error) {
        console.log(error);
        (0, utils_1.errorHandler)(res, error);
    }
});
exports.addTag = addTag;
exports.default = {
    getAllTags: exports.getAllTags,
    addTag: exports.addTag,
};
//# sourceMappingURL=tagController.js.map