import { Request } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
const dynamicUpload = (field: string, folder: string = "default") => {
 
  // let's define the storage options for multer
  const storage = multer.diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, destination: string) => void
    ) => {
      const uploadsDir = path.join(__dirname, `../../uploads/${folder}`);
      //   check if the folder exists, if not create it
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      cb(null, uploadsDir);
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, filename: string) => void
    ) => {
      const fileExt = path.extname(file.originalname);
      const fileName = `${file.fieldname}-${Date.now()}${fileExt}`;
      cb(null, fileName);
    },
    
  });

  // lets initialize the multer with the storage options
  const upload = multer({ storage });
  return upload.single(field);
};

export default dynamicUpload;
