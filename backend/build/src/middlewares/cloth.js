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
exports.checkClothAssociation = void 0;
const entity_1 = require("../entity");
const Yup = __importStar(require("yup"));
const checkClothAssociation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // clotheId
    const { id } = req.params;
    const schema = yield Yup.object().shape({
        id: Yup.string().required("Clothe ID is required"),
    });
    try {
        yield schema.validate({ id });
        const cloth = yield entity_1.ClothEntity.findOne({
            where: { id: parseInt(id) },
        });
        if (!cloth) {
            return res.status(404).json({
                data: null,
                message: "Cloth not found",
            });
        }
        const associatedWithOutfit = yield entity_1.OutfitAndClothEntity.find({
            where: {
                cloth_id: parseInt(id),
            },
        });
        if ((associatedWithOutfit === null || associatedWithOutfit === void 0 ? void 0 : associatedWithOutfit.length) > 0) {
            return res.status(400).json({
                data: {
                    associatedWithOutfit,
                },
                message: "Delete unsuccessful, this cloth is associated with at least one outfit.",
            });
        }
        return next();
    }
    catch (error) {
        return res.status(400).json({
            data: null,
            message: error.message,
        });
    }
});
exports.checkClothAssociation = checkClothAssociation;
//# sourceMappingURL=cloth.js.map