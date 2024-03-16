
import { Router } from "express";
import AuthRouter from "@/routes/auth"
import ClotheRouter from "@/routes/cloth"
import ClothAndTagsRouter from "@/routes/clothAndTags";
import PostRouter from "@/routes/post";
import TagRouter from "@/routes/tag";
import FileRouter from "@/routes/file"
import OutfitRouter from "@/routes/outfit";

const baseRouter = () => {
  const router = Router();

  router.use("/auth",AuthRouter)
  router.use("/clothe",ClotheRouter)
  router.use("/clothAndTags",ClothAndTagsRouter);
  router.use("/posts",PostRouter)
  router.use("/tag",TagRouter);
  router.use("/files", FileRouter)
  router.use("/outfit",OutfitRouter);
  router.use("*", (req, res) => {
    res.status(404).json({
      status: "error",
      message: "Not Found",
    });
  });

  return router;
};

export default baseRouter;
