import {Request, Response} from "express";
import * as Yup from "yup";
import {ClothAndTagEntity} from "@entity";
import {errorHandler, sendError, sendSuccess} from "@utils";

export const getClothesByTagId = async (req: Request, res: Response) => {
    const {id} = req.params;
    const schema = Yup.object().shape({
        id: Yup.string().required("Please enter the id of the tag"),
    });
    await schema.validate({id});

    try {
        const clothes = await ClothAndTagEntity.find({
            where: {
                tag_id: parseInt(id) as number,
            },
        });

        if (!clothes) {
            return sendError({
                res,
                status: 404,
                message: "Tag not found",
            });
        }

        return sendSuccess({
            res,
            message: "Clothes fetched successfully",
            data: clothes,
        });
    } catch (error) {
        console.log(error);
        errorHandler(res, error);
    }
}

export default {
    getClothByTagId: getClothesByTagId,
}