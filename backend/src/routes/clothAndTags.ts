import express from "express";
import {protect} from "@/middlewares/auth";
import ClothAndTagsController from "@/controllers/clothAndTagsController";

const ClothAndTagsRouter = express.Router();

ClothAndTagsRouter.route("/:id").get(protect, ClothAndTagsController.getClothByTagId);

export default ClothAndTagsRouter;