"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageFilter = void 0;
const imageFilter = function (req, file, cb) {
    //accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
exports.imageFilter = imageFilter;
//# sourceMappingURL=util.js.map