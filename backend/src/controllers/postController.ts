import { PostEntity, MediaEntity, LikesEntity, DislikesEntity } from "@entity";
import {
  errorHandler,
  sendSuccess,
  sendError,
} from "@utils";
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
export const addLike = async (req: Request, res: Response) => {
  const { post_id } = req.body;
  const schema = Yup.object().shape({
    post_id: Yup.number().required(
        "Requires outfit_id to post"
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
    
    if (!likes) {
      return sendError({
        res,
        status: 404,
        message: "Likes not found",
      });
    }
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

export default {
  getAllPosts,
  addPost,
};