import { ClothEntity, MediaEntity } from "@entity";
import { errorHandler, sendError, sendSuccess } from "@utils";
import { Request, Response } from "express";
import * as Yup from "yup";
import path from "path";
import fs from "fs";
import { deleteMediaById } from "src/utils/helpers";
export const getClothById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const schema = Yup.object().shape({
    id: Yup.string().required("Please enter the id of the cloth"),
  });
  await schema.validate({ id });
  try {
    const cloth = await ClothEntity.findOne({
      where: {
        id: parseInt(id) as number,
      },
    });
    if (!cloth) {
      return sendError({
        res,
        status: 404,
        message: "Cloth not found",
      });
    }
    return sendSuccess({
      res,
      message: "Cloth fetched successfully",
      data: cloth,
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

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
      media_id: media ? media.id : null,
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

export const updateCloth = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { description, no_of_wears, wears_remaining } = req.body;

  const schema = Yup.object().shape({
    id: Yup.string().optional(),
    no_of_wears: Yup.number().optional(),
    wears_remaining: Yup.number().optional(),
  });
  await schema.validate({ id, no_of_wears, wears_remaining });
  try {
    let cloth = await ClothEntity.findOne({
      where: {
        id: parseInt(id) as number,
      },
    });
    if (!cloth) {
      return sendError({
        res,
        status: 404,
        message: "Cloth not found",
      });
    }
    if (req.file) {
      const file = req.file;
      const relativePath = path.relative(".", req.file.path);
      const media = await MediaEntity.create({
        relative_path: relativePath,
        media_type: file.mimetype.split("/")[1],
      }).save();
      const oldMediaId = cloth.media_id;
      cloth.media_id = media.id;
      // delete old media
      if (oldMediaId) {
        await deleteMediaById(oldMediaId);
      }
    }
    cloth.no_of_wears = no_of_wears || cloth.no_of_wears;
    cloth.wears_remaining = wears_remaining || cloth.wears_remaining;
    cloth.description = description || cloth.description;
    await cloth.save();
    return sendSuccess({
      res,
      message: "Cloth updated successfully",
      data: {
        cloth,
      },
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

export const deleteCloth = async (req: Request, res: Response) => {
  const { id } = req.params;
  const schema = Yup.object().shape({
    id: Yup.string().required("Please enter the id of the cloth"),
  });
  await schema.validate({ id });
  try {
    const cloth = await ClothEntity.findOne({
      where: {
        id: parseInt(id) as number,
      },
    });
    if (!cloth) {
      return sendError({
        res,
        status: 404,
        message: "Cloth not found",
      });
    }
    const mediaId = cloth.media_id;
    if (mediaId) {
      await deleteMediaById(mediaId);
    }
    await ClothEntity.delete({
      id: parseInt(id) as number,
    });
    return sendSuccess({
      res,
      message: "Cloth deleted successfully",
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

export default {
  getAllClothes,
  addCloth,
  getClothById,
  updateCloth,
  deleteCloth,
};
