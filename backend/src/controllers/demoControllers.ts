import * as Yup from "yup";
import { Request, Response } from "express";

import { errorHandler, sendSuccess } from "@utils";

export const DemoController = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const schema = Yup.object().shape({});
    await schema.validate(body);
    return sendSuccess({
      res,
      message: "Message",
      data: {},
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
