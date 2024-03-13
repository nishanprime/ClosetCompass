import "reflect-metadata";
import { DataSource } from "typeorm";

// entity imports
import Entities from "@/entity";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [...Object.values(Entities)],
});
