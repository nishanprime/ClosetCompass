import { protect } from "@middlewares/auth";
import { FileController } from "@controllers/index";
import express from "express";
import dynamicUpload from "@middlewares/uploadMiddleware";

const FileRouter = express.Router();

FileRouter.route("/upload").post(
  protect,
  dynamicUpload("files"),
  FileController.uploadFiles
);
FileRouter.route("/*").delete(protect, FileController.deleteFileById);
FileRouter.route("/*").get(protect, FileController.getFileById);

export default FileRouter;
