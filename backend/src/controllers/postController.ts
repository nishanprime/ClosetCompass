import { PostEntity, MediaEntity, LikesEntity, DislikesEntity, CommentEntity } from "@entity";
import {
  errorHandler,
  sendSuccess,
  sendError,
} from "@utils";
import { deleteMediaById } from "src/utils/helpers";
import { Request, Response } from "express";
import * as Yup from "yup";
import path from "path";

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await PostEntity.find();
    return sendSuccess({
      res,
      message: "Posts fetched successfully",
      data: posts,
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};
export const addPost = async (req: Request, res: Response) => {
  const { text, privacy, outfit_id } = req.body;

  const schema = Yup.object().shape({
    outfit_id: Yup.number().required(
        "Requires outfit_id to post"
    ),
    privacy: Yup.string().required(
        "Provide privacy setting"
    ),
  });
  try {
    await schema.validate({ privacy, outfit_id });
    const current_user = req.user;
    let media;
    // make sure to add host to the file path and url encode the file path
    if (req.file) {
      const file = req.file;
      const relativePath = path.relative(".", req.file.path);
      media = await MediaEntity.create({
        relative_path: relativePath,
        media_type: file.mimetype.split("/")[1],
      }).save();
    }
    const post = await PostEntity.create({
      user_id: current_user.id,
      media_id: (media ? media.id : null),
      text,
      outfit_id,
      privacy,
    }).save();
    return sendSuccess({
      res,
      message: "Posted successfully",
      data: {
        ...post,

      },
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};
export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const schema = Yup.object().shape({
    id: Yup.string().required("Please enter the id of the post"),
  });
  await schema.validate({ id });
  try {
    const post = await PostEntity.findOne({
      where: {
        id: parseInt(id) as number,
      },
    });
    if (!post) {
      return sendError({
        res,
        status: 404,
        message: "Post not found",
      });
    }
    const mediaId = post.media_id;
    if (mediaId) {
      await deleteMediaById(mediaId);
    }
    await PostEntity.delete({
      id: parseInt(id) as number,
    });
    return sendSuccess({
      res,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};
export const addLike = async (req: Request, res: Response) => {
  const { post_id } = req.body;
  const schema = Yup.object().shape({
    post_id: Yup.number().required(
        "Requires post_id"
    ),
  });
  try {
    await schema.validate({ post_id });
    const current_user = req.user;
    const like = await LikesEntity.create({
      user_id: current_user.id,
      post_id,
    }).save();
    return sendSuccess({
      res,
      message: "Liked successfully",
      data: {
        ...like,

      },
    });

  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};
export const getLikesByPost = async (req: Request, res: Response) => {
  const { post_id } = req.body;
  try {
    const likes = await LikesEntity.find({
      where: {
        post_id: parseInt(post_id) as number,
      }
    });
    return sendSuccess({
      res,
      message: "Likes fetched successfully",
      data: likes,
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};
export const unlike = async (req: Request, res: Response) => {
  const { post_id } = req.params;
  const schema = Yup.object().shape({
    post_id: Yup.string().required("Please enter the id of the post"),
  });
  await schema.validate({ post_id });
  try {
    const current_user = req.user;
    const like = await LikesEntity.findOne({
      where: {
        post_id: parseInt(post_id) as number,
        user_id: current_user.id
      },
    });
    if (!like) {
      return sendError({
        res,
        status: 404,
        message: "Like not found",
      });
    }
    await LikesEntity.delete({
        post_id: parseInt(post_id) as number,
        user_id: current_user.id,
    });
    return sendSuccess({
      res,
      message: "Unliked successfully",
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};
export const addDislike = async (req: Request, res: Response) => {
  const { post_id } = req.body;
  const schema = Yup.object().shape({
    post_id: Yup.number().required(
        "Requires post_id"
    ),
  });
  try {
    await schema.validate({ post_id });
    const current_user = req.user;
    const dislike = await DislikesEntity.create({
      user_id: current_user.id,
      post_id,
    }).save();
    return sendSuccess({
      res,
      message: "Disliked successfully",
      data: {
        ...dislike,

      },
    });

  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};
export const getDislikesByPost = async (req: Request, res: Response) => {
  const { post_id } = req.body;
  try {
    const dislikes = await DislikesEntity.find({
      where: {
        post_id: parseInt(post_id) as number,
      }
    });
    return sendSuccess({
      res,
      message: "Disikes fetched successfully",
      data: dislikes,
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};
export const undislike = async (req: Request, res: Response) => {
  const { post_id } = req.params;
  const schema = Yup.object().shape({
    post_id: Yup.string().required("Please enter the id of the post"),
  });
  await schema.validate({ post_id });
  try {
    const current_user = req.user;
    const dislike = await DislikesEntity.findOne({
      where: {
        post_id: parseInt(post_id) as number,
        user_id: current_user.id
      },
    });
    if (!dislike) {
      return sendError({
        res,
        status: 404,
        message: "Like not found",
      });
    }
    await DislikesEntity.delete({
        post_id: parseInt(post_id) as number,
        user_id: current_user.id,
    });
    return sendSuccess({
      res,
      message: "Undisliked successfully",
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};
export const addComment = async (req: Request, res: Response) => {
  const { text, post_id } = req.body;

  const schema = Yup.object().shape({
    post_id: Yup.number().required(
        "Requires post_id to comment"
    ),
    text: Yup.string().required(
        "Comment cannot be empty"
    ),
  });
  try {
    await schema.validate({ text, post_id });
    const current_user = req.user;
    const comment = await CommentEntity.create({
      user_id: current_user.id,
      text,
      post_id,
    }).save();
    return sendSuccess({
      res,
      message: "Posted successfully",
      data: {
        ...comment,

      },
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};
export const updateComment = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { text } = req.body;

  const schema = Yup.object().shape({
    id: Yup.string().optional(),
    text: Yup.string().optional()
  });
  await schema.validate({ id, text });
  try {
    let comment = await CommentEntity.findOne({
      where: {
        id: parseInt(id) as number,
      },
    });
    if (!comment) {
      return sendError({
        res,
        status: 404,
        message: "Comment not found",
      });
    }
    comment.text = text || comment.text;
    await comment.save();
    return sendSuccess({
      res,
      message: "Comment updated successfully",
      data: {
        comment,
      },
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};
export const deleteComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const schema = Yup.object().shape({
    id: Yup.string().required("Please enter the id of the comment"),
  });
  await schema.validate({ id });
  try {
    const comment = await CommentEntity.findOne({
      where: {
        id: parseInt(id) as number,
      },
    });
    if (!comment) {
      return sendError({
        res,
        status: 404,
        message: "Comment not found",
      });
    }
    await CommentEntity.delete({
      id: parseInt(id) as number,
    });
    return sendSuccess({
      res,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};
export const getCommentsByPost = async (req: Request, res: Response) => {
  const { post_id } = req.body;
  try {
    const comments = await CommentEntity.find({
      where: {
        post_id: parseInt(post_id) as number,
      }
    });
    return sendSuccess({
      res,
      message: "Comments fetched successfully",
      data: comments,
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};


export default {
  getAllPosts,
  addPost,
  deletePost,
  addLike,
  getLikesByPost,
  unlike,
  addDislike,
  getDislikesByPost,
  undislike,
  addComment,
  updateComment,
  deleteComment,
};