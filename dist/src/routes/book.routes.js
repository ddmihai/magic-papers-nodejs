"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookRouter = (0, express_1.Router)();
bookRouter.get("/", (req, res) => {
    res.send("Get all books");
});
exports.default = bookRouter;
