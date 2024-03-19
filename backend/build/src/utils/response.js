"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.sendError = exports.sendSuccess = void 0;
const sendSuccess = ({ res, status = 200, data, message = "", }) => {
    res.status(status).json({
        status: "ok",
        message: message ? message : null,
        data,
    });
};
exports.sendSuccess = sendSuccess;
const sendError = ({ res, status, data = null, message, }) => {
    res.status(status).json({
        status: "error",
        message,
        data,
    });
};
exports.sendError = sendError;
const errorHandler = (res, err) => {
    if (err.errors && err.errors.length > 0) {
        return res.status(400).json({
            status: "error",
            message: err.message,
            data: null,
            path: err.path,
        });
    }
    if (err.message) {
        return res.status(400).json({
            status: "error",
            message: err.message,
            data: null,
            path: err.path,
        });
    }
    return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
        data: null,
        path: "",
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=response.js.map