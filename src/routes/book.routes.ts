import { Router } from "express";
const bookRouter = Router();


bookRouter.get("/", (req, res) => {
    res.send("Get all books");
});





export default bookRouter