"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerMiddleWare = void 0;
// Set storage path for products
const multer = require("multer");
const fs = require("fs");
const util_1 = require("../util/util");
function multerMiddleWare(options) {
    if (!options || !options.type) {
        throw new Error("Type should be set");
    }
    const DIR = `public/uploads/images/${options.path ? options.path : "default"}`;
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            fs.mkdirSync(DIR, { recursive: true });
            return cb(null, DIR);
        },
        filename: (req, file, cb) => {
            const fileName = Date.now() + '-' + file.originalname.toLowerCase();
            cb(null, fileName);
        }
    });
    const upload = multer({ storage: storage, fileFilter: util_1.imageFilter });
    const middleware = (req, res, next) => {
        console.log(1);
        if (options.type === "single") {
            console.log(2);
            upload.single('image')(req, res, () => {
                // if (!req.file) return res.json({ error: "Invalid File Type" })
                next();
            });
            console.log(6);
        }
        else if (options.type === "multiple") {
            upload.array('images')(req, res, () => {
                // if (!req.files) return res.json({ error: "Invalid File Type" })
                next();
            });
        }
    };
    return middleware;
}
exports.multerMiddleWare = multerMiddleWare;
//# sourceMappingURL=multer.js.map