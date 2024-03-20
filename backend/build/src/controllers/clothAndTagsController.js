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
exports.getClothesByTagId = void 0;
const Yup = __importStar(require("yup"));
const entity_1 = require("../entity");
const utils_1 = require("../utils");
const getClothesByTagId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log("I am here", id);
    const schema = Yup.object().shape({
        id: Yup.string().required("Please enter the id of the tag"),
    });
    yield schema.validate({ id });
    try {
        const clothes = yield entity_1.ClothAndTagEntity.find({
            where: {
                tag_id: parseInt(id),
            },
        });
        if (!clothes) {
            return (0, utils_1.sendError)({
                res,
                status: 404,
                message: "Tag not found",
            });
        }
        console.log("found", clothes);
        return (0, utils_1.sendSuccess)({
            res,
            message: "Clothes fetched successfully",
            data: clothes,
        });
    }
    catch (error) {
        console.log(error);
        (0, utils_1.errorHandler)(res, error);
    }
});
exports.getClothesByTagId = getClothesByTagId;
exports.default = {
    getClothByTagId: exports.getClothesByTagId,
};
//# sourceMappingURL=clothAndTagsController.js.map