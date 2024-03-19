"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./bootstrap/database"));
const index_1 = require("./middlewares/index");
const index_2 = __importDefault(require("./routes/index"));
const path = require("path");
const getApp = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    yield (0, index_1.middlewaresConfig)(app);
    yield (0, database_1.default)();
    const mediaPath = path.resolve(__dirname, "../uploads");
    app.use("/uploads", express_1.default.static(mediaPath));
    const staticPath = path.resolve(__dirname, "../../../frontend/dist");
    app.use(express_1.default.static(staticPath));
    app.get("*", (req, res, next) => {
        if (!req.path.startsWith("/api")) {
            return res.sendFile(path.join(staticPath, "index.html"));
        }
        next();
    });
    app.use("/api", (0, index_2.default)());
    return app;
});
exports.default = getApp;
//# sourceMappingURL=server.js.map