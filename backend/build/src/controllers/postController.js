"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentsByPost = exports.deleteComment = exports.updateComment = exports.addComment = exports.undislike = exports.getDislikesByPost = exports.addDislike = exports.unlike = exports.getLikesByPost = exports.addLike = exports.deletePost = exports.addPost = exports.getAllPosts = void 0;
const entity_1 = require("../entity");
const utils_1 = require("../utils");
const helpers_1 = require("../../src/utils/helpers");
const Yup = __importStar(require("yup"));
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield entity_1.PostEntity.createQueryBuilder("post")
            .leftJoinAndMapOne("post.user", entity_1.UserEntity, "user", "user.id = post.user_id")
            .leftJoinAndMapMany("post.outfitAndCloth", entity_1.OutfitAndClothEntity, "outfit_and_cloth", "outfit_and_cloth.outfit_id = post.outfit_id")
            .leftJoinAndMapMany("post.clothes", // This will map directly to the post entity under the .clothes property
        entity_1.ClothEntity, "cloth", "cloth.id = outfit_and_cloth.cloth_id")
            .orderBy("post.created_at", "DESC")
            .getMany();
        return (0, utils_1.sendSuccess)({
            res,
            message: "Posts fetched successfully",
            data: posts,
        });
    }
    catch (error) {
        console.log(error);
        (0, utils_1.errorHandler)(res, error);
    }
});
exports.getAllPosts = getAllPosts;
const addPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { caption, outfit_id, media_id } = req.body;
    const schema = Yup.object().shape({
        outfit_id: Yup.number().required("Requires outfit_id to post"),
    });
    try {
        yield schema.validate({ outfit_id });
        const current_user = req.user;
        const post = yield entity_1.PostEntity.create({
            user_id: current_user.id,
            media_id: media_id,
            text: caption,
            outfit_id,
        }).save();
        return (0, utils_1.sendSuccess)({
            res,
            message: "Posted successfully",
            data: Object.assign({}, post),
        });
    }
    catch (error) {
        console.log(error);
        (0, utils_1.errorHandler)(res, error);
    }
});
exports.addPost = addPost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const schema = Yup.object().shape({
        id: Yup.string().required("Please enter the id of the post"),
    });
    yield schema.validate({ id });
    try {
        const post = yield entity_1.PostEntity.findOne({
            where: {
                id: parseInt(id),
            },
        });
        if (!post) {
            return (0, utils_1.sendError)({
                res,
                status: 404,
                message: "Post not found",
            });
        }
        const mediaId = post.media_id;
        if (mediaId) {
            yield (0, helpers_1.deleteMediaById)(mediaId);
        }
        yield entity_1.PostEntity.delete({
            id: parseInt(id),
        });
        return (0, utils_1.sendSuccess)({
            res,
            message: "Post deleted successfully",
        });
    }
    catch (error) {
        console.log(error);
        (0, utils_1.errorHandler)(res, error);
    }
});
exports.deletePost = deletePost;
const addLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { post_id } = req.body;
    const schema = Yup.object().shape({
        post_id: Yup.number().required("Requires post_id"),
    });
    try {
        yield schema.validate({ post_id });
        const current_user = req.user;
        const like = yield entity_1.LikesEntity.create({
            user_id: current_user.id,
            post_id,
        }).save();
        return (0, utils_1.sendSuccess)({
            res,
            message: "Liked successfully",
            data: Object.assign({}, like),
        });
    }
    catch (error) {
        console.log(error);
        (0, utils_1.errorHandler)(res, error);
    }
});
exports.addLike = addLike;
const getLikesByPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { post_id } = req.body;
    try {
        const likes = yield entity_1.LikesEntity.find({
            where: {
                post_id: parseInt(post_id),
            },
        });
        return (0, utils_1.sendSuccess)({
            res,
            message: "Likes fetched successfully",
            data: likes,
        });
    }
    catch (error) {
        console.log(error);
        (0, utils_1.errorHandler)(res, error);
    }
});
exports.getLikesByPost = getLikesByPost;
const unlike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { post_id } = req.params;
    const schema = Yup.object().shape({
        post_id: Yup.string().required("Please enter the id of the post"),
    });
    yield schema.validate({ post_id });
    try {
        const current_user = req.user;
        const like = yield entity_1.LikesEntity.findOne({
            where: {
                post_id: parseInt(post_id),
                user_id: current_user.id,
            },
        });
        if (!like) {
            return (0, utils_1.sendError)({
                res,
                status: 404,
                message: "Like not found",
            });
        }
        yield entity_1.LikesEntity.delete({
            post_id: parseInt(post_id),
            user_id: current_user.id,
        });
        return (0, utils_1.sendSuccess)({
            res,
            message: "Unliked successfully",
        });
    }
    catch (error) {
        console.log(error);
        (0, utils_1.errorHandler)(res, error);
    }
});
exports.unlike = unlike;
const addDislike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { post_id } = req.body;
    const schema = Yup.object().shape({
        post_id: Yup.number().required("Requires post_id"),
    });
    try {
        yield schema.validate({ post_id });
        const current_user = req.user;
        const dislike = yield entity_1.DislikesEntity.create({
            user_id: current_user.id,
            post_id,
        }).save();
        return (0, utils_1.sendSuccess)({
            res,
            message: "Disliked successfully",
            data: Object.assign({}, dislike),
        });
    }
    catch (error) {
        console.log(error);
        (0, utils_1.errorHandler)(res, error);
    }
});
exports.addDislike = addDislike;
const getDislikesByPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { post_id } = req.body;
    try {
        const dislikes = yield entity_1.DislikesEntity.find({
            where: {
                post_id: parseInt(post_id),
            },
        });
        return (0, utils_1.sendSuccess)({
            res,
            message: "Disikes fetched successfully",
            data: dislikes,
        });
    }
    catch (error) {
        console.log(error);
        (0, utils_1.errorHandler)(res, error);
    }
});
exports.getDislikesByPost = getDislikesByPost;
const undislike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { post_id } = req.params;
    const schema = Yup.object().shape({
        post_id: Yup.string().required("Please enter the id of the post"),
    });
    yield schema.validate({ post_id });
    try {
        const current_user = req.user;
        const dislike = yield entity_1.DislikesEntity.findOne({
            where: {
                post_id: parseInt(post_id),
                user_id: current_user.id,
            },
        });
        if (!dislike) {
            return (0, utils_1.sendError)({
                res,
                status: 404,
                message: "Like not found",
            });
        }
        yield entity_1.DislikesEntity.delete({
            post_id: parseInt(post_id),
            user_id: current_user.id,
        });
        return (0, utils_1.sendSuccess)({
            res,
            message: "Undisliked successfully",
        });
    }
    catch (error) {
        console.log(error);
        (0, utils_1.errorHandler)(res, error);
    }
});
exports.undislike = undislike;
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text, post_id } = req.body;
    const schema = Yup.object().shape({
        post_id: Yup.number().required("Requires post_id to comment"),
        text: Yup.string().required("Comment cannot be empty"),
    });
    try {
        yield schema.validate({ text, post_id });
        const current_user = req.user;
        const comment = yield entity_1.CommentEntity.create({
            user_id: current_user.id,
            text,
            post_id,
        }).save();
        return (0, utils_1.sendSuccess)({
            res,
            message: "Posted successfully",
            data: Object.assign({}, comment),
        });
    }
    catch (error) {
        console.log(error);
        (0, utils_1.errorHandler)(res, error);
    }
});
exports.addComment = addComment;
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { text } = req.body;
    const schema = Yup.object().shape({
        id: Yup.string().optional(),
        text: Yup.string().optional(),
    });
    yield schema.validate({ id, text });
    try {
        let comment = yield entity_1.CommentEntity.findOne({
            where: {
                id: parseInt(id),
            },
        });
        if (!comment) {
            return (0, utils_1.sendError)({
                res,
                status: 404,
                message: "Comment not found",
            });
        }
        comment.text = text || comment.text;
        yield comment.save();
        return (0, utils_1.sendSuccess)({
            res,
            message: "Comment updated successfully",
            data: {
                comment,
            },
        });
    }
    catch (error) {
        console.log(error);
        (0, utils_1.errorHandler)(res, error);
    }
});
exports.updateComment = updateComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const schema = Yup.object().shape({
        id: Yup.string().required("Please enter the id of the comment"),
    });
    yield schema.validate({ id });
    try {
        const comment = yield entity_1.CommentEntity.findOne({
            where: {
                id: parseInt(id),
            },
        });
        if (!comment) {
            return (0, utils_1.sendError)({
                res,
                status: 404,
                message: "Comment not found",
            });
        }
        yield entity_1.CommentEntity.delete({
            id: parseInt(id),
        });
        return (0, utils_1.sendSuccess)({
            res,
            message: "Comment deleted successfully",
        });
    }
    catch (error) {
        console.log(error);
        (0, utils_1.errorHandler)(res, error);
    }
});
exports.deleteComment = deleteComment;
const getCommentsByPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { post_id } = req.body;
    try {
        const comments = yield entity_1.CommentEntity.find({
            where: {
                post_id: parseInt(post_id),
            },
        });
        return (0, utils_1.sendSuccess)({
            res,
            message: "Comments fetched successfully",
            data: comments,
        });
    }
    catch (error) {
        console.log(error);
        (0, utils_1.errorHandler)(res, error);
    }
});
exports.getCommentsByPost = getCommentsByPost;
exports.default = {
    getAllPosts: exports.getAllPosts,
    addPost: exports.addPost,
    deletePost: exports.deletePost,
    addLike: exports.addLike,
    getLikesByPost: exports.getLikesByPost,
    unlike: exports.unlike,
    addDislike: exports.addDislike,
    getDislikesByPost: exports.getDislikesByPost,
    undislike: exports.undislike,
    addComment: exports.addComment,
    updateComment: exports.updateComment,
    deleteComment: exports.deleteComment,
};
//# sourceMappingURL=postController.js.map