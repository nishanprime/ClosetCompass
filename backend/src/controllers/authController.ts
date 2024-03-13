import {
  errorHandler,
  generateToken,
  removeCookie,
  sendError,
  sendSuccess,
  setCookie,
} from "@/utils";
import argon2 from "argon2";
import { Request, Response } from "express";
import UserEntity from "src/entity/user";
import * as Yup from "yup";

export const loginController = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const schema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
  try {
    await schema.validate({ username, password });
    let userExists = await UserEntity.findOne({
      where: { username: username },
    });
    if (!userExists) {
      return sendError({
        res,
        status: 404,
        message: "User not found",
      });
    }
    const isMatched = await argon2.verify(userExists.password, password);
    if (!isMatched) {
      return sendError({
        res,
        status: 401,
        message: "Invalid password",
      });
    }
    const authToken = generateToken(userExists.username);
    await setCookie(res, authToken);
    return sendSuccess({
      res,
      message: "Login successful",
      data: {
        username: userExists.username,
      },
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};
export const registerController = async (req: Request, res: Response) => {
  let { first_name, last_name, email, username, password } = req.body;
  username = username.toLowerCase();
  const schema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
  try {
    await schema.validate({
      first_name,
      last_name,
      email,
      username,
      password,
    });
    let userExists = await UserEntity.findOne({
      where: {
        username: username,
      },
    });
    if (userExists) {
      return sendError({
        res,
        status: 400,
        message: "Username already taken",
      });
    }
    let emailExists = await UserEntity.findOne({
      where: {
        email: email,
      },
    });

    if (emailExists) {
      return sendError({
        res,
        status: 400,
        message: "Email already taken",
      });
    }

    const user = await UserEntity.create({
      first_name,
      last_name,
      email,
      username,
      password,
    }).save();

    // login the user
    const authToken = generateToken(user.username);
    await setCookie(res, authToken);

    return sendSuccess({
      res,
      message: "User created successfully",
      data: {
        username: user.username,
      },
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};
export const me = async (req: Request, res: Response) => {
  const { user } = req;
  try {
    return sendSuccess({
      res,
      message: "User data has been fetched successfully.",
      data: user,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    await removeCookie(res);

    return sendSuccess({
      res,
      message: "User has been logged out successfully.",
      data: null,
    });
  } catch (err) {
    errorHandler(res, err);
  }
};

export default {
  loginController,
  registerController,
  logout,
  me,
};
