import { Request, Response } from "express";
import { HTTP_STATUS_OK, HTTP_STATUS_NOT_FOUND } from "../utils/httpStatusCodes";
import { applyDiscount, applyDiscounts } from "../utils/applyDiscounts";
import rawProducts from '../data/products.json';

export const getProducts = (req: Request, res: Response) => {
  const products = applyDiscounts(rawProducts);
  res.status(200).json(products);
};

export const getProduct = (req: Request, res: Response) => {
  const productId = parseInt(req.params.productId);
  const product = rawProducts.find(product => product.id === productId);
  if (product) {
    const response = applyDiscount(product);
    res.status(HTTP_STATUS_OK).json(response);
  } else {
    res.status(HTTP_STATUS_NOT_FOUND).json({message: "Cannot find product with this product ID."});
  }
};
