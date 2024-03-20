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
exports.deleteCloth = exports.updateCloth = exports.addCloth = exports.getAllClothes = exports.getClothById = void 0;
const entity_1 = require("../entity");
const utils_1 = require("../utils");
const Yup = __importStar(require("yup"));
const helpers_1 = require("../utils/helpers");
const typeorm_1 = require("typeorm");
const getClothById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const schema = Yup.object().shape({
        id: Yup.string().required("Please enter the id of the cloth"),
    });
    yield schema.validate({ id });
    try {
        const cloth = yield entity_1.ClothEntity.createQueryBuilder("cloth")
            .where("cloth.id = :id", { id: parseInt(id) })
            .leftJoinAndMapOne("cloth.media", entity_1.MediaEntity, "media", "cloth.media_id = media.id")
            .getOne();
        if (!cloth) {
            return (0, utils_1.sendError)({
                res,
                status: 404,
                message: "Cloth not found",
            });
        }
        return (0, utils_1.sendSuccess)({
            res,
            message: "Cloth fetched successfully",
            data: cloth,
        });
    }
    catch (error) {
        console.log(error);
        (0, utils_1.errorHandler)(res, error);
    }
});
exports.getClothById = getClothById;
const getAllClothes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, page, page_size = 10, sort_by, sort_order } = req.query;
    const schema = Yup.object().shape({
        sort_order: Yup.string().oneOf(["ASC", "DESC"]),
        sort_by: Yup.string().matches(/^(id|name|number_of_products|created_at)$/, "Invalid sort by value"),
        page: Yup.number().min(0),
    });
    try {
        yield schema.validate({
            sort_order,
            sort_by,
            page,
        }, {
            abortEarly: false,
        });
        const cloths = yield entity_1.ClothEntity.createQueryBuilder("cloth")
            .where("cloth.user_id = :id", { id: req.user.id })
            .leftJoinAndMapOne("cloth.media", entity_1.MediaEntity, "media", "cloth.media_id = media.id");
        if (search && search !== "") {
            cloths.andWhere(new typeorm_1.Brackets((qb) => {
                qb.where("LOWER(cloth.description) LIKE LOWER(:search)", {
                    search: `%${search}%`,
                });
            }));
        }
        if (sort_by && sort_order) {
            cloths.orderBy(`cloth.${sort_by}`, sort_order);
        }
        const total = yield cloths.getCount();
        if (page) {
            cloths.offset((Number(page) - 1) * Number(page_size));
            cloths.limit(Number(page_size));
        }
        const results = yield cloths.getMany();
        return (0, utils_1.sendSuccess)({
            res,
            message: "Clothes fetched successfully",
            data: {
                cloths: results,
                meta: {
                    total,
                    page: Number(page) || 1,
                    limit: Number(page_size),
                },
            },
        });
    }
    catch (error) {
        console.log(error);
        (0, utils_1.errorHandler)(res, error);
    }
});
exports.getAllClothes = getAllClothes;
const addCloth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { description, no_of_wears, cloth_id, tags } = req.body;
    const schema = Yup.object().shape({
        no_of_wears: Yup.number().required("Please enter the number of wears before washing"),
        description: Yup.string().required("Please enter the description of the cloth"),
        cloth_id: Yup.string().optional(),
        tags: Yup.array().of(Yup.string()),
    });
    try {
        yield schema.validate({ no_of_wears, description, cloth_id, tags });
        const current_user = req.user;
        const media = yield entity_1.MediaEntity.findOne({
            where: {
                id: parseInt(cloth_id),
            },
        });
        if (!media) {
            return (0, utils_1.sendError)({
                res,
                status: 404,
                message: "Invalid Cloth/Media not found",
            });
        }
        const cloth = yield entity_1.ClothEntity.create({
            user_id: current_user.id,
            description,
            no_of_wears,
            wears_remaining: no_of_wears,
            media_id: media.id,
        }).save();
        if (tags && tags.length > 0) {
            for (const tag of tags) {
                const new_tag = yield entity_1.ClothAndTagEntity.create({
                    cloth_id: cloth.id,
                    tag_id: parseInt(tag),
                });
                console.log("Just created", new_tag);
                yield new_tag.save();
            }
        }
        return (0, utils_1.sendSuccess)({
            res,
            message: "Cloth added successfully",
            data: Object.assign({}, cloth),
        });
    }
    catch (error) {
        console.log(error);
        (0, utils_1.errorHandler)(res, error);
    }
});
exports.addCloth = addCloth;
const updateCloth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { description, no_of_wears, wears_remaining, cloth_id } = req.body;
    const schema = Yup.object().shape({
        id: Yup.string().optional(),
        no_of_wears: Yup.number().optional(),
        wears_remaining: Yup.number().optional(),
        cloth_id: Yup.string().optional(),
    });
    yield schema.validate({ id, no_of_wears, wears_remaining, cloth_id });
    try {
        let cloth = yield entity_1.ClothEntity.findOne({
            where: {
                id: parseInt(id),
            },
        });
        if (!cloth) {
            return (0, utils_1.sendError)({
                res,
                status: 404,
                message: "Cloth not found",
            });
        }
        cloth.no_of_wears = no_of_wears || cloth.no_of_wears;
        cloth.wears_remaining = wears_remaining || cloth.wears_remaining;
        cloth.description = description || cloth.description;
        cloth.id = cloth_id || cloth.id;
        yield cloth.save();
        return (0, utils_1.sendSuccess)({
            res,
            message: "Cloth updated successfully",
            data: {
                cloth,
            },
        });
    }
    catch (error) {
        console.log(error);
        (0, utils_1.errorHandler)(res, error);
    }
});
exports.updateCloth = updateCloth;
const deleteCloth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const schema = Yup.object().shape({
        id: Yup.string().required("Please enter the id of the cloth"),
    });
    yield schema.validate({ id });
    try {
        const cloth = yield entity_1.ClothEntity.findOne({
            where: {
                id: parseInt(id),
            },
        });
        if (!cloth) {
            return (0, utils_1.sendError)({
                res,
                status: 404,
                message: "Cloth not found",
            });
        }
        const mediaId = cloth.media_id;
        if (mediaId) {
            yield (0, helpers_1.deleteMediaById)(mediaId);
        }
        yield entity_1.ClothEntity.delete({
            id: parseInt(id),
        });
        return (0, utils_1.sendSuccess)({
            res,
            message: "Cloth deleted successfully",
            data: {},
        });
    }
    catch (error) {
        console.log(error);
        (0, utils_1.errorHandler)(res, error);
    }
});
exports.deleteCloth = deleteCloth;
exports.default = {
    getAllClothes: exports.getAllClothes,
    addCloth: exports.addCloth,
    getClothById: exports.getClothById,
    updateCloth: exports.updateCloth,
    deleteCloth: exports.deleteCloth,
};
//# sourceMappingURL=clothController.js.map