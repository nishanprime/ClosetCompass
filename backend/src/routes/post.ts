import express from "express";
import { protect } from "@/middlewares/auth";
import { PostController } from "@/controllers/index";
import dynamicUpload from "@/middlewares/uploadMiddleware";
const PostRouter = express.Router();

// since we have protec middleware, only authenticated users can access these routes
PostRouter.route("/all").get(protect, PostController.getAllPosts);
PostRouter.route("/add").post(
  protect,
  dynamicUpload("clothe", "clothes"),
  PostController.addPost
);
PostRouter.route("/:id").delete(protect, PostController.deletePost);
PostRouter.route("/like").post(protect, PostController.addLike);
PostRouter.route("/likes").get(protect, PostController.getLikesByPost);
PostRouter.route("/unlike").delete(protect, PostController.unlike);
PostRouter.route("/dislike").post(protect, PostController.addDislike);
PostRouter.route("/dislikes").get(protect, PostController.getDislikesByPost);
PostRouter.route("/undislike").delete(protect, PostController.undislike);
PostRouter.route("/comment").post(protect, PostController.addComment);
PostRouter.route("/recomment").put(protect, PostController.updateComment);
PostRouter.route("/uncomment").delete(protect, PostController.deleteComment);

export default PostRouter;
