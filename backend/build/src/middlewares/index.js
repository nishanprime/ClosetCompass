"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewaresConfig = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const middlewaresConfig = (app) => {
    app.use((0, cookie_parser_1.default)());
    app.use(express_1.default.json({ limit: "10mb" }));
    app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
    app.use((0, cors_1.default)({
        origin: true,
        credentials: true,
    }));
};
exports.middlewaresConfig = middlewaresConfig;
//# sourceMappingURL=index.js.map