import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import { UserEntity } from "@/entity";
import { sendError, getToken } from "@/utils";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = await getToken(req);

  if (!token) {
    return sendError({
      res,
      status: 401,
      data: null,
      message: "Login is required to access this!",
    });
  }

  let decoded: any = jwt.decode(token);

  if (!decoded.username) {
    return sendError({
      res,
      status: 401,
      data: null,
      message: "Login is required to access this!",
    });
  }

  let user = await UserEntity.findOne({
    where: { username: decoded.username },
  });

  if (!user) {
    return sendError({
      res,
      status: 401,
      data: null,
      message: "Login is required to access this!",
    });
  }

  req.user = user;
  next();
};


