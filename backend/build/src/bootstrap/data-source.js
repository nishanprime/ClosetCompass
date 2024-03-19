"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
// entity imports
const entity_1 = __importDefault(require("../entity"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [...Object.values(entity_1.default)],
});
//# sourceMappingURL=data-source.js.map