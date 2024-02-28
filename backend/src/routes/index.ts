
import { Router } from "express";
import AuthRouter from "@routes/auth"
import ClotheRouter from "@routes/cloth"
import PostRouter from "@routes/post";
const baseRouter = () => {
  const router = Router();

  router.use("/auth",AuthRouter)
  router.use("/clothe",ClotheRouter)
  router.use("/posts",PostRouter)
  router.use("*", (req, res) => {
    res.status(404).json({
      status: "error",
      message: "Not Found",
    });
  });

  return router;
};

export default baseRouter;
