import express from "express";
import {protect} from "@/middlewares/auth";
import OutfitController from "@/controllers/outfitController";

const OutfitRouter = express.Router();

OutfitRouter.route("/all").get(protect, OutfitController.getAllOutfits);
OutfitRouter.route("/:id").get(protect, OutfitController.getOutfitById);
OutfitRouter.route("/:id").put(protect, OutfitController.updateOutfit);
OutfitRouter.route("/:id").delete(protect, OutfitController.deleteOutfit);
OutfitRouter.route("/add").post(protect, OutfitController.addOutfit);

export default OutfitRouter;