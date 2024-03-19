"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../controllers/index");
const auth_1 = require("../middlewares/auth");
const AuthRouter = express_1.default.Router();
AuthRouter.route("/login").post(index_1.AuthController.loginController);
AuthRouter.route("/register").post(index_1.AuthController.registerController);
AuthRouter.route("/logout").get(auth_1.protect, index_1.AuthController.logout);
// this is the route for getting the logged in user
// also used to check if user is authenticated
AuthRouter.route("/me").get(auth_1.protect, index_1.AuthController.me);
exports.default = AuthRouter;
//# sourceMappingURL=auth.js.map