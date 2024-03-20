"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const index_1 = require("../controllers/index");
const uploadMiddleware_1 = __importDefault(require("../middlewares/uploadMiddleware"));
const PostRouter = express_1.default.Router();
// since we have protec middleware, only authenticated users can access these routes
PostRouter.route("/all").get(auth_1.protect, index_1.PostController.getAllPosts);
PostRouter.route("/add").post(auth_1.protect, (0, uploadMiddleware_1.default)("clothe", "clothes"), index_1.PostController.addPost);
PostRouter.route("/remove/:id").delete(auth_1.protect, index_1.PostController.deletePost);
PostRouter.route("/like").post(auth_1.protect, index_1.PostController.addLike);
PostRouter.route("/likes").get(auth_1.protect, index_1.PostController.getLikesByPost);
PostRouter.route("/my-likes").get(auth_1.protect, index_1.PostController.getLikesByUser);
PostRouter.route("/unlike").post(auth_1.protect, index_1.PostController.unlike);
PostRouter.route("/dislike").post(auth_1.protect, index_1.PostController.addDislike);
PostRouter.route("/dislikes").get(auth_1.protect, index_1.PostController.getDislikesByPost);
PostRouter.route("/my-dislikes").get(auth_1.protect, index_1.PostController.getDislikesByUser);
PostRouter.route("/undislike").post(auth_1.protect, index_1.PostController.undislike);
PostRouter.route("/comment").post(auth_1.protect, index_1.PostController.addComment);
PostRouter.route("/recomment").put(auth_1.protect, index_1.PostController.updateComment);
PostRouter.route("/uncomment").delete(auth_1.protect, index_1.PostController.deleteComment);
exports.default = PostRouter;
//# sourceMappingURL=post.js.map