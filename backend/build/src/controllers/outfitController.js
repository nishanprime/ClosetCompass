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
exports.deleteOutfit = exports.updateOutfit = exports.addOutfit = exports.getAllOutfits = exports.getOutfitById = void 0;
const Yup = __importStar(require("yup"));
const entity_1 = require("../entity");
const utils_1 = require("../utils");
const typeorm_1 = require("typeorm");
const getOutfitById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const schema = Yup.object().shape({
        id: Yup.string().required("Please enter the id of the outfit"),
    });
    yield schema.validate({ id });
    try {
        const outfit = yield entity_1.OutfitEntity.findOne({
            where: {
                id: parseInt(id),
            },
        });
        if (!outfit) {
            return (0, utils_1.sendError)({
                res,
                status: 404,
                message: "Outfit not found",
            });
        }
        return (0, utils_1.sendSuccess)({
            res,
            message: "Outfit fetched successfully",
            data: outfit,
        });
    }
    catch (error) {
        console.log(error);
        (0, utils_1.errorHandler)(res, error);
    }
});
exports.getOutfitById = getOutfitById;
const getAllOutfits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, page, pageSize = 10, sortBy, sortOrder } = req.query;
    const schema = Yup.object().shape({
        sort_order: Yup.string().oneOf(["ASC", "DESC"]),
        sort_by: Yup.string().matches(/^(id|name|description|created_at)$/, "Invalid sort by value"),
        page: Yup.number().min(0),
    });
    try {
        yield schema.validate({
            sortOrder,
            sortBy,
            page,
        }, {
            abortEarly: false,
        });
        console.log("I am in here");
        console.log(req.user.id);
        const outfits = entity_1.OutfitEntity.createQueryBuilder("outfit")
            .where("outfit.user_id = :id", { id: req.user.id })
            .leftJoinAndMapMany("outfit.locations", entity_1.OutfitAndClothEntity, "outfit_clothes", "outfit_clothes.outfit_id = outfit.id")
            .leftJoinAndMapMany("outfit.clothes", entity_1.ClothEntity, "cloth", "cloth.media_id = outfit_clothes.cloth_id");
        if (search && search !== "") {
            outfits.andWhere(new typeorm_1.Brackets((qb) => {
                qb.where("LOWER(outfit.description) LIKE LOWER(:search)", {
                    search: `%${search}%`,
                });
            }));
        }
        if (sortBy && sortOrder) {
            outfits.orderBy(`outfit.${sortBy}`, sortOrder);
        }
        const total = yield outfits.getCount();
        if (page) {
            outfits.offset((Number(page) - 1) & Number(pageSize));
            outfits.limit(Number(pageSize));
        }
        const results = yield outfits.getMany();
        return (0, utils_1.sendSuccess)({
            res,
            message: "Outfits fetched successfully",
            data: {
                outfits: results,
                meta: {
                    total,
                    page: Number(page) || 1,
                    limit: Number(pageSize),
                },
            },
        });
    }
    catch (error) {
        console.log(error);
        (0, utils_1.errorHandler)(res, error);
    }
});
exports.getAllOutfits = getAllOutfits;
const addOutfit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, clothes } = req.body;
    const schema = Yup.object().shape({
        outfitId: Yup.string().optional(),
        name: Yup.string().required("Please enter the name of the outfit"),
        description: Yup.string().required("Please enter the description of the outfit"),
        clothes: Yup.array().of(Yup.number()).min(1),
    });
    try {
        yield schema.validate({ name, description });
        const currentUser = req.user;
        const outfit = yield entity_1.OutfitEntity.create({
            user_id: currentUser.id,
            name,
            description,
        }).save();
        for (let i = 0; i < clothes.length; i++) {
            let clothId = clothes[i];
            yield entity_1.OutfitAndClothEntity.create({
                outfit_id: outfit.id,
                cloth_id: clothId,
                location_id: i,
            }).save();
        }
        return (0, utils_1.sendSuccess)({
            res,
            message: "Outfit added successfully",
            data: Object.assign({}, outfit),
        });
    }
    catch (error) {
        console.log(error);
        (0, utils_1.errorHandler)(res, error);
    }
});
exports.addOutfit = addOutfit;
const updateOutfit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { outfitId, name, description } = req.body;
    const schema = Yup.object().shape({
        id: Yup.string().optional(),
        outfitId: Yup.string().optional(),
        name: Yup.string().optional(),
        description: Yup.string().optional(),
    });
    yield schema.validate({ id, outfitId, name, description });
    try {
        let outfit = yield entity_1.OutfitEntity.findOne({
            where: {
                id: parseInt(id),
            },
        });
        if (!outfit) {
            return (0, utils_1.sendError)({
                res,
                status: 404,
                message: "Outfit not found",
            });
        }
        outfit.id = outfitId || outfit.id;
        outfit.name = name || outfit.name;
        outfit.description = description || outfit.description;
        yield outfit.save();
        return (0, utils_1.sendSuccess)({
            res,
            message: "Outfit updated successfully",
            data: { outfit },
        });
    }
    catch (error) {
        console.log(error);
        (0, utils_1.errorHandler)(res, error);
    }
});
exports.updateOutfit = updateOutfit;
const deleteOutfit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const schema = Yup.object().shape({
        id: Yup.string().required("Please enter the id of the outfit"),
    });
    yield schema.validate({ id });
    try {
        const outfit = yield entity_1.OutfitEntity.findOne({
            where: {
                id: parseInt(id),
            },
        });
        if (!outfit) {
            return (0, utils_1.sendError)({
                res,
                status: 404,
                message: "Outfit not found",
            });
        }
        yield entity_1.OutfitEntity.delete({
            id: parseInt(id),
        });
        return (0, utils_1.sendSuccess)({
            res,
            message: "Outfit deleted successfully",
            data: {},
        });
    }
    catch (error) {
        console.log(error);
        (0, utils_1.errorHandler)(res, error);
    }
});
exports.deleteOutfit = deleteOutfit;
exports.default = {
    getOutfitById: exports.getOutfitById,
    getAllOutfits: exports.getAllOutfits,
    addOutfit: exports.addOutfit,
    updateOutfit: exports.updateOutfit,
    deleteOutfit: exports.deleteOutfit,
};
//# sourceMappingURL=outfitController.js.map