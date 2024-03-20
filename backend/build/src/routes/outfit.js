"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const outfitController_1 = __importDefault(require("../controllers/outfitController"));
const OutfitRouter = express_1.default.Router();
OutfitRouter.route("/all").get(auth_1.protect, outfitController_1.default.getAllOutfits);
OutfitRouter.route("/:id").get(auth_1.protect, outfitController_1.default.getOutfitById);
OutfitRouter.route("/:id").put(auth_1.protect, outfitController_1.default.updateOutfit);
OutfitRouter.route("/:id").delete(auth_1.protect, outfitController_1.default.deleteOutfit);
OutfitRouter.route("/add").post(auth_1.protect, outfitController_1.default.addOutfit);
exports.default = OutfitRouter;
//# sourceMappingURL=outfit.js.map