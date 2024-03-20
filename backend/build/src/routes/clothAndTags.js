"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const clothAndTagsController_1 = __importDefault(require("../controllers/clothAndTagsController"));
const ClothAndTagsRouter = express_1.default.Router();
ClothAndTagsRouter.route("/:id").get(auth_1.protect, clothAndTagsController_1.default.getClothByTagId);
exports.default = ClothAndTagsRouter;
//# sourceMappingURL=clothAndTags.js.map