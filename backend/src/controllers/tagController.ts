import {errorHandler, sendSuccess} from "@utils";
import {Request, Response} from "express";
import {TagEntity} from "@entity";
import {Timestamp} from "typeorm";

export const getAllTags = async (req: Request, res: Response) => {
    try {
        const tags = await TagEntity.find();
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

export default {
    getAllTags
}