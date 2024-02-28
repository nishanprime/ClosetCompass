import { MediaEntity } from "@entity";
import fs from "fs";
export const deleteMediaById = async (id: number) => {
  const media = await MediaEntity.findOne({
    where: {
      id: id,
    },
  });
  if (!media) {
    return;
  }
  const filePath = media.relative_path;
  const fileExists = fs.existsSync("./" + filePath);
  if (fileExists) {
    fs.unlinkSync("./" + filePath);
  }
};
