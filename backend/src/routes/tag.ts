import express from "express";
import {protect} from "@middlewares/auth";
import {TagController} from "@controllers/index";
const TagRouter = express.Router();

TagRouter.route("/all").get(protect, TagController.getAllTags);

export default TagRouter;