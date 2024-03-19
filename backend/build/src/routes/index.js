"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../routes/auth"));
const cloth_1 = __importDefault(require("../routes/cloth"));
const post_1 = __importDefault(require("../routes/post"));
const tag_1 = __importDefault(require("../routes/tag"));
const file_1 = __importDefault(require("../routes/file"));
const baseRouter = () => {
    const router = (0, express_1.Router)();
    router.use("/auth", auth_1.default);
    router.use("/clothe", cloth_1.default);
    router.use("/posts", post_1.default);
    router.use("/tag", tag_1.default);
    router.use("/files", file_1.default);
    router.use("*", (req, res) => {
        res.status(404).json({
            status: "error",
            message: "Not Found",
        });
    });
    return router;
};
exports.default = baseRouter;
//# sourceMappingURL=index.js.map