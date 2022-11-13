import express from "express";
import { getProducts, getProduct, evaluateBasketPrice, getTotalPriceForProduct, checkout } from "../controllers/products";

const router = express.Router();

router.get('/', getProducts);
router.post('/checkout', checkout);
router.post('/price', evaluateBasketPrice);
router.get('/price/:productId', getTotalPriceForProduct);
router.get('/:productId', getProduct)

export default router;
