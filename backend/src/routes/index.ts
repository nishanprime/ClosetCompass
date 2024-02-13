import { DemoController } from "@controllers/demoControllers";
import { Router } from "express";

const baseRouter = () => {
  const router = Router();

  router.use("/demo", DemoController);

  router.use("*", (req, res) => {
    res.status(404).json({
      status: "error",
      message: "Not Found",
    });
  });

  return router;
};

export default baseRouter;
