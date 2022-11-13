import express from "express";
import { getProducts, getProduct, getTotalPriceForProduct } from "../controllers/products";

const router = express.Router();

router.get('/', getProducts);
router.get('/price/:productId', getTotalPriceForProduct);
router.get('/:productId', getProduct)

export default router;
