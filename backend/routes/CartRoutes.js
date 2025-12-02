import express from "express";

import { addToCart,getCart } from "../controllers/CartController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/addcart", authMiddleware , addToCart);
router.get("/", authMiddleware, getCart);

export default router;