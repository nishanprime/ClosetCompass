"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const index_1 = require("../controllers/index");
const TagRouter = express_1.default.Router();
TagRouter.route("/all").get(auth_1.protect, index_1.TagController.getAllTags);
TagRouter.route("/add").post(auth_1.protect, index_1.TagController.addTag);
exports.default = TagRouter;
//# sourceMappingURL=tag.js.map