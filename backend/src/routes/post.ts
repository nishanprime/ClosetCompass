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
PostRouter.route("/remove/:id").delete(protect, PostController.deletePost);
PostRouter.route("/like").post(protect, PostController.addLike);
PostRouter.route("/likes").get(protect, PostController.getLikesByPost);
PostRouter.route("/my-likes").get(protect, PostController.getLikesByUser);
PostRouter.route("/unlike").post(protect, PostController.unlike);
PostRouter.route("/dislike").post(protect, PostController.addDislike);
PostRouter.route("/dislikes").get(protect, PostController.getDislikesByPost);
PostRouter.route("/my-dislikes").get(protect, PostController.getDislikesByUser);
PostRouter.route("/undislike").post(protect, PostController.undislike);
PostRouter.route("/comment").post(protect, PostController.addComment);
PostRouter.route("/recomment").put(protect, PostController.updateComment);
PostRouter.route("/uncomment").delete(protect, PostController.deleteComment);

export default PostRouter;
