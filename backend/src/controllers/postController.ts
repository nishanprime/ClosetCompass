import { PostEntity, MediaEntity, LikesEntity, DislikesEntity } from "@entity";
import {
  errorHandler,
  sendSuccess,
} from "@utils";
import argon2 from "argon2";
import { Request, Response } from "express";
import UserEntity from "src/entity/user";
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

export default {
  getAllPosts,
  addPost,
};