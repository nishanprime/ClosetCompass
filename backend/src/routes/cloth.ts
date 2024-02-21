import express from "express";
import { protect } from "@middlewares/auth";
import { ClothController } from "@controllers/index";
import dynamicUpload from "@middlewares/uploadMiddleware";
const ClothRouter = express.Router();

// since we have protec middleware, only authenticated users can access these routes
ClothRouter.route("/all").get(protect, ClothController.getAllClothes);
ClothRouter.route("/add").post(
  protect,
  dynamicUpload("clothe", "clothes"),
  ClothController.addCloth
);

export default ClothRouter;
