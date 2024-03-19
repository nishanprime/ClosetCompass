import { ClothEntity, MediaEntity } from "@/entity";
import { errorHandler, sendError, sendSuccess } from "@/utils";
import { Request, Response } from "express";
import * as Yup from "yup";
import path from "path";
import fs from "fs";
import { deleteMediaById } from "@/utils/helpers";
import { Brackets } from "typeorm";
export const getClothById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const schema = Yup.object().shape({
    id: Yup.string().required("Please enter the id of the cloth"),
  });
  await schema.validate({ id });
  try {
    const cloth = await ClothEntity.createQueryBuilder("cloth")
      .where("cloth.id = :id", { id: parseInt(id) as number })
      .leftJoinAndMapOne(
        "cloth.media",
        MediaEntity,
        "media",
        "cloth.media_id = media.id"
      )
      .getOne();
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
  const { search, page, page_size = 10, sort_by, sort_order } = req.query;
  const schema = Yup.object().shape({
    sort_order: Yup.string().oneOf(["ASC", "DESC"]),
    sort_by: Yup.string().matches(
      /^(id|name|number_of_products|created_at)$/,
      "Invalid sort by value"
    ),
    page: Yup.number().min(0),
  });
  try {
    await schema.validate(
      {
        sort_order,
        sort_by,
        page,
      },
      {
        abortEarly: false,
      }
    );
    const cloths = await ClothEntity.createQueryBuilder("cloth")
      .where("cloth.user_id = :id", { id: req.user.id })
      .leftJoinAndMapOne(
        "cloth.media",
        MediaEntity,
        "media",
        "cloth.media_id = media.id"
      );

    if (search && search !== "") {
      cloths.andWhere(
        new Brackets((qb) => {
          qb.where("LOWER(cloth.description) LIKE LOWER(:search)", {
            search: `%${search}%`,
          });
        })
      );
    }
    if (sort_by && sort_order) {
      cloths.orderBy(`cloth.${sort_by}`, sort_order as "ASC" | "DESC");
    }
    const total = await cloths.getCount();
    if (page) {
      cloths.offset((Number(page) - 1) * Number(page_size));

      cloths.limit(Number(page_size));
    }
    const results = await cloths.getMany();
    return sendSuccess({
      res,
      message: "Clothes fetched successfully",
      data: {
        cloths: results,
        meta: {
          total,
          page: Number(page) || 1,
          limit: Number(page_size),
        },
      },
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};
export const addCloth = async (req: Request, res: Response) => {
  const { description, no_of_wears, cloth_id } = req.body;
  const schema = Yup.object().shape({
    no_of_wears: Yup.number().required(
      "Please enter the number of wears before washing"
    ),
    description: Yup.string().required(
      "Please enter the description of the cloth"
    ),
    cloth_id: Yup.string().optional(),
  });
  try {
    await schema.validate({ no_of_wears, description, cloth_id });
    const current_user = req.user;
    const media = await MediaEntity.findOne({
      where: {
        id: parseInt(cloth_id) as number,
      },
    });
    if (!media) {
      return sendError({
        res,
        status: 404,
        message: "Invalid Cloth/Media not found",
      });
    }
    const cloth = await ClothEntity.create({
      user_id: current_user.id,
      description,
      no_of_wears,
      wears_remaining: no_of_wears,
      media_id: media.id,
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

  const { description, no_of_wears, wears_remaining, cloth_id } = req.body;

  const schema = Yup.object().shape({
    id: Yup.string().optional(),
    no_of_wears: Yup.number().optional(),
    wears_remaining: Yup.number().optional(),
    cloth_id: Yup.string().optional(),
  });
  await schema.validate({ id, no_of_wears, wears_remaining, cloth_id });
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

    cloth.no_of_wears = no_of_wears || cloth.no_of_wears;
    cloth.wears_remaining = wears_remaining || cloth.wears_remaining;
    cloth.description = description || cloth.description;
    cloth.id = cloth_id || cloth.id;
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
      data: {},
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
