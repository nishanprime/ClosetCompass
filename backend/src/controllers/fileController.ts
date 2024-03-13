import { MediaEntity } from "@/entity";
import { errorHandler, sendError, sendSuccess } from "@/utils";
import { Request, Response } from "express";
import path from "path";
import { deleteMediaById } from "src/utils/helpers";

const uploadFiles = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const file = req.file as Express.Multer.File;
    const relativePath = path.relative(".", req.file.path);
    let media;
    if (req.file) {
      const file = req.file;
      const relativePath = path.relative(".", req.file.path);
      media = await MediaEntity.create({
        relative_path: relativePath,
        media_type: file.mimetype.split("/")[1],
      }).save();
    }
    return sendSuccess({
      res,
      status: 201,
      message: "Files uploaded successfully",
      data: {
        ...media,
      },
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

const getFileById = async (req: Request, res: Response) => {
  try {
    const id = req.params[0];
    if (!id) {
      return sendError({
        res,
        message: "Invalid file id",
        status: 400,
      });
    }
    const response = await MediaEntity.findOne({
      where: {
        id: parseInt(id),
      },
    });
    if (!response) {
      return sendError({
        res,
        message: "File not found",
        status: 404,
      });
    }
    const { relative_path } = response;
    const fileUrl = `${process.env.API_URI}/${relative_path}`;
    // send buffer as inline
    res.setHeader("Content-Type", "image/png");
    return res.redirect(fileUrl);
  } catch (error) {
    return errorHandler(res, error);
  }
};

export const deleteFileById = async (req: Request, res: Response) => {
  const id = req.params[0];

  try {
    const file = await MediaEntity.findOne({
      where: {
        id: parseInt(id),
      },
    });

    if (!file) {
      return sendError({
        res,
        message: "File not found",
        status: 404,
      });
    }

    const mediaId = file.id;

    if (mediaId) {
      await deleteMediaById(mediaId);
    }

    await file.remove();

    return sendSuccess({
      res,
      status: 200,
      message: "File deleted successfully",
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

export default {
  uploadFiles,
  getFileById,
  deleteFileById,
};
