import express from "express";
import { protect } from "@middlewares/auth";
import { PostController } from "@controllers/index";
import dynamicUpload from "@middlewares/uploadMiddleware";
const PostRouter = express.Router();

// since we have protec middleware, only authenticated users can access these routes
PostRouter.route("/all").get(protect, PostController.getAllPosts);
PostRouter.route("/add").post(
  protect,
  dynamicUpload("clothe", "clothes"),
  PostController.addPost
);

export default PostRouter;
