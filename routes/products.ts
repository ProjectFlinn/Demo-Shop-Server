import express from "express";
import { getProducts, getProduct } from "../controllers/products";

const router = express.Router();

router.get('/', getProducts);
router.get('/:productId', getProduct)

export default router;
