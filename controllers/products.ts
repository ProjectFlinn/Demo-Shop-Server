import { Request, Response } from "express";
import products from '../data/products.json';
import { HTTP_STATUS_OK, HTTP_STATUS_NOT_FOUND } from "../utils/httpStatusCodes";

export const getProducts = (req: Request, res: Response) => {
  res.status(200).json(products);
};

export const getProduct = (req: Request, res: Response) => {
  const productId = parseInt(req.params.productId);
  const product = products.find(product => product.id === productId);
  if (product) {
    res.status(HTTP_STATUS_OK).json(product);
  } else {
    res.status(HTTP_STATUS_NOT_FOUND).json({message: "Cannot find product with this product ID."});
  }
};