import { ClothEntity, MediaEntity } from "@entity";
import {
  errorHandler,
  generateToken,
  removeCookie,
  sendError,
  sendSuccess,
  setCookie,
} from "@utils";
import argon2 from "argon2";
import { Request, Response } from "express";
import UserEntity from "src/entity/user";
import * as Yup from "yup";
import path from "path";

export const getAllClothes = async (req: Request, res: Response) => {
  try {
    const cloths = await ClothEntity.find();
    return sendSuccess({
      res,
      message: "Clothes fetched successfully",
      data: cloths,
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};
export const addCloth = async (req: Request, res: Response) => {
  const { description, no_of_wears } = req.body;

  const schema = Yup.object().shape({
    no_of_wears: Yup.number().required(
      "Please enter the number of wears before washing"
    ),
  });
  try {
    await schema.validate({ no_of_wears });
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
    const cloth = await ClothEntity.create({
      user_id: current_user.id,
      description,
      no_of_wears,
      wears_remaining: no_of_wears,
      media_id: (media ? media.id : undefined),
    }).save();
    return sendSuccess({
      res,
      message: "Cloth added successfully",
      data: {
        ...cloth,

      },
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

export default {
  getAllClothes,
  addCloth,
};
