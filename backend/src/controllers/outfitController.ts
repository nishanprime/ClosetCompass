import { Request, Response } from "express";
import * as Yup from "yup";
import { MediaEntity, OutfitAndClothEntity, OutfitEntity } from "@/entity";
import { errorHandler, sendError, sendSuccess } from "@/utils";
import { Brackets } from "typeorm";

export const getOutfitById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const schema = Yup.object().shape({
    id: Yup.string().required("Please enter the id of the outfit"),
  });
  await schema.validate({ id });

  try {
    const outfit = await OutfitEntity.findOne({
      where: {
        id: parseInt(id) as number,
      },
    });

    if (!outfit) {
      return sendError({
        res,
        status: 404,
        message: "Outfit not found",
      });
    }

    return sendSuccess({
      res,
      message: "Outfit fetched successfully",
      data: outfit,
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

export const getAllOutfits = async (req: Request, res: Response) => {
  const { search, page, pageSize = 10, sortBy, sortOrder } = req.query;
  const schema = Yup.object().shape({
    sort_order: Yup.string().oneOf(["ASC", "DESC"]),
    sort_by: Yup.string().matches(
      /^(id|name|description|created_at)$/,
      "Invalid sort by value"
    ),
    page: Yup.number().min(0),
  });
  try {
    await schema.validate(
      {
        sortOrder,
        sortBy,
        page,
      },
      {
        abortEarly: false,
      }
    );

    const outfits = OutfitEntity.createQueryBuilder("outfit")
      .where("outfit.user_id = :id", { id: req.user.id })
      .leftJoinAndMapMany(
        "outfit.clothes",
        OutfitAndClothEntity,
        "outfit_clothes",
        "outfit_clothes.outfit_id = outfit.id"
      )
      .leftJoinAndMapMany(
        "outfit.medias",
        MediaEntity,
        "media",
        "media.id = outfit_clothes.cloth_id"
      );

    if (search && search !== "") {
      outfits.andWhere(
        new Brackets((qb) => {
          qb.where("LOWER(outfit.description) LIKE LOWER(:search)", {
            search: `%${search}%`,
          });
        })
      );
    }
    if (sortBy && sortOrder) {
      outfits.orderBy(`outfit.${sortBy}`, sortOrder as "ASC" | "DESC");
    }
    const total = await outfits.getCount();
    if (page) {
      outfits.offset((Number(page) - 1) & Number(pageSize));
      outfits.limit(Number(pageSize));
    }

    const results = await outfits.getMany();
    return sendSuccess({
      res,
      message: "Outfits fetched successfully",
      data: {
        outfits: results,
        meta: {
          total,
          page: Number(page) || 1,
          limit: Number(pageSize),
        },
      },
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

export const addOutfit = async (req: Request, res: Response) => {
  const { name, description, clothes } = req.body;
  const schema = Yup.object().shape({
    outfitId: Yup.string().optional(),
    name: Yup.string().required("Please enter the name of the outfit"),
    description: Yup.string().required(
      "Please enter the description of the outfit"
    ),
    clothes: Yup.array().of(Yup.number()).min(1),
  });

  try {
    await schema.validate({ name, description });
    const currentUser = req.user;

    const outfit = await OutfitEntity.create({
      user_id: currentUser.id,
      name,
      description,
    }).save();

    for (let i = 0; i < clothes.length; i++) {
      let clothId = clothes[i];
      await OutfitAndClothEntity.create({
        outfit_id: outfit.id,
        cloth_id: clothId,
        location_id: i,
      }).save();
    }

    return sendSuccess({
      res,
      message: "Outfit added successfully",
      data: { ...outfit },
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

export const updateOutfit = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { outfitId, name, description } = req.body;
  const schema = Yup.object().shape({
    id: Yup.string().optional(),
    outfitId: Yup.string().optional(),
    name: Yup.string().optional(),
    description: Yup.string().optional(),
  });
  await schema.validate({ id, outfitId, name, description });

  try {
    let outfit = await OutfitEntity.findOne({
      where: {
        id: parseInt(id) as number,
      },
    });

    if (!outfit) {
      return sendError({
        res,
        status: 404,
        message: "Outfit not found",
      });
    }
    outfit.id = outfitId || outfit.id;
    outfit.name = name || outfit.name;
    outfit.description = description || outfit.description;
    await outfit.save();

    return sendSuccess({
      res,
      message: "Outfit updated successfully",
      data: { outfit },
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

export const deleteOutfit = async (req: Request, res: Response) => {
  const { id } = req.params;
  const schema = Yup.object().shape({
    id: Yup.string().required("Please enter the id of the outfit"),
  });
  await schema.validate({ id });

  try {
    const outfit = await OutfitEntity.findOne({
      where: {
        id: parseInt(id) as number,
      },
    });

    if (!outfit) {
      return sendError({
        res,
        status: 404,
        message: "Outfit not found",
      });
    }

    await OutfitEntity.delete({
      id: parseInt(id) as number,
    });

    return sendSuccess({
      res,
      message: "Outfit deleted successfully",
      data: {},
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

export default {
  getOutfitById,
  getAllOutfits,
  addOutfit,
  updateOutfit,
  deleteOutfit,
};
