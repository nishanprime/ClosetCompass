"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const index_1 = require("../controllers/index");
const uploadMiddleware_1 = __importDefault(require("../middlewares/uploadMiddleware"));
const cloth_1 = require("../middlewares/cloth");
const ClothRouter = express_1.default.Router();
// since we have protec middleware, only authenticated users can access these routes
ClothRouter.route("/all").get(auth_1.protect, index_1.ClothController.getAllClothes);
ClothRouter.route("/:id").get(auth_1.protect, index_1.ClothController.getClothById);
ClothRouter.route("/add").post(auth_1.protect, index_1.ClothController.addCloth);
ClothRouter.route("/:id").put(auth_1.protect, (0, uploadMiddleware_1.default)("clothe", "clothes"), index_1.ClothController.updateCloth);
ClothRouter.route("/:id").delete(auth_1.protect, cloth_1.checkClothAssociation, index_1.ClothController.deleteCloth);
exports.default = ClothRouter;
//# sourceMappingURL=cloth.js.map