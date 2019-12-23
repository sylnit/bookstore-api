import express from "express";
import checkForToken from "../middlewares/auth";
import userController from "../controllers/userController";
import bookController from "../controllers/bookController";

const router = express.Router();

//auth routes
router.post("/users", userController.createUser);
router.post("/login", userController.login);

//protected routes
router.get("/books", checkForToken, bookController.getBooks);
router.post("/books", checkForToken, bookController.createBook);
router.put("/books/:bookId", checkForToken, bookController.updateBook);
router.delete("/books/:bookId", checkForToken, bookController.deleteBook);

export default router;
