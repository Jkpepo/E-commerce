import express from "express";

import { addToCart,getCart,decrementProduct,incrementProduct,cleanProduct } from "../controllers/CartController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/addcart", authMiddleware , addToCart);
router.get("/", authMiddleware, getCart);
router.post("/decrementproduct", authMiddleware, decrementProduct);
router.post("/incrementproduct", authMiddleware, incrementProduct);
router.delete("/cleanproduct", authMiddleware, cleanProduct);

export default router;