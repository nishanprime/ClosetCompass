import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

export const middlewaresConfig = (app: Express) => {
  app.use(cookieParser());
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  app.use(
    cors({
      origin:
        process.env.NODE_ENV === "production"
          ? "https://closetcompass.nishanthapa.com"
          : true,
      credentials: true,
    })
  );
};
