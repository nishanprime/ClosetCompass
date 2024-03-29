import express from "express";
import connectDB from "./bootstrap/database";
import { middlewaresConfig } from "@/middlewares/index";

import baseRouter from "@/routes/index";
import IUser from "./interfaces/IUser";
import path = require("path");
//global variables
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

const getApp = async () => {
  const app = express();
  await middlewaresConfig(app);
  await connectDB();

  const mediaPath = path.resolve(__dirname, "../uploads");

  app.use("/uploads", express.static(mediaPath));
  // const staticPath = path.resolve(__dirname, "../../../frontend/dist");
  // app.use(express.static(staticPath));
  // app.get("*", (req, res, next) => {
  //   if (!req.path.startsWith("/api")) {
  //     return res.sendFile(path.join(staticPath, "index.html"));
  //   }
  //   next();
  // });

  app.use("/api", baseRouter());

  return app;
};

export default getApp;
