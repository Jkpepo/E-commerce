import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productsController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { sellerOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/",authMiddleware,sellerOnly,createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;