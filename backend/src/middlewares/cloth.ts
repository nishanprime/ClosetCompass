import { ClothEntity, OutfitAndClothEntity } from "@/entity";
import { NextFunction, Request, Response } from "express";
import * as Yup from "yup";
export const checkClothAssociation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // clotheId
  const { id } = req.params;
  const schema = await Yup.object().shape({
    id: Yup.string().required("Clothe ID is required"),
  });
  try {
    await schema.validate({ id });
    const cloth = await ClothEntity.findOne({
      where: { id: parseInt(id) },
    });
    if (!cloth) {
      return res.status(404).json({
        data: null,
        message: "Cloth not found",
      });
    }
    const associatedWithOutfit = await OutfitAndClothEntity.find({
      where: {
        cloth_id: parseInt(id),
      },
    });
    if (associatedWithOutfit?.length > 0) {
      return res.status(400).json({
        data: {
          associatedWithOutfit,
        },
        message:
          "Delete unsuccessful, this cloth is associated with at least one outfit.",
      });
    }
    return next();
  } catch (error) {
    return res.status(400).json({
      data: null,
      message: error.message,
    });
  }
};
