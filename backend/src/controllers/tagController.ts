import {errorHandler, sendSuccess} from "@/utils";
import {Request, Response} from "express";
import {TagEntity} from "@/entity";
import {Timestamp} from "typeorm";
import * as Yup from "yup";

export const getAllTags = async (req: Request, res: Response) => {
    try {
        const tags = await TagEntity.createQueryBuilder("tag")
        .where("tag.user_id = :id", { id: req.user.id }).getMany();
        return sendSuccess({
            res,
            message: "Tags fetched successfully",
            data: tags,
        });
    } catch (error) {
        console.log(error);
        errorHandler(res, error);
    }
}

export const addTag = async (req: Request, res: Response) => {
    const { tag } = req.body;
    const schema = Yup.object().shape({
      tag: Yup.string().required(
        "Please enter the tag name"
      ),
    });
    try {
        await schema.validate({ tag });
        const current_user = req.user;
        const new_tag = await TagEntity.create({
          user_id: current_user.id,
          tag_name: tag,
        }).save();
        return sendSuccess({
          res,
          message: "Tag added successfully",
          data: {
            ...new_tag,
          },
        });
      } catch (error) {
        console.log(error);
        errorHandler(res, error);
      }
}

export default {
    getAllTags,
    addTag,
}