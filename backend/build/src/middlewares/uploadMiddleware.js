"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dynamicUpload = (field, folder = "default") => {
    // let's define the storage options for multer
    const storage = multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            const uploadsDir = path_1.default.join(__dirname, `../../uploads/${folder}`);
            //   check if the folder exists, if not create it
            if (!fs_1.default.existsSync(uploadsDir)) {
                fs_1.default.mkdirSync(uploadsDir, { recursive: true });
            }
            cb(null, uploadsDir);
        },
        filename: (req, file, cb) => {
            const fileExt = path_1.default.extname(file.originalname);
            const fileName = `${file.fieldname}-${Date.now()}${fileExt}`;
            cb(null, fileName);
        },
    });
    // lets initialize the multer with the storage options
    const upload = (0, multer_1.default)({ storage });
    return upload.single(field);
};
exports.default = dynamicUpload;
//# sourceMappingURL=uploadMiddleware.js.map