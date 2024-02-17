import express from "express";
import { AuthController } from "@controllers/index";
import { protect } from "@middlewares/auth";
const AuthRouter = express.Router();

AuthRouter.route("/login").post(AuthController.loginController);
AuthRouter.route("/register").post(AuthController.registerController);
AuthRouter.route("/logout").get(protect, AuthController.logout);
// this is the route for getting the logged in user
// also used to check if user is authenticated
AuthRouter.route("/me").get(protect, AuthController.me);

export default AuthRouter;
