import { Request, Response } from "express";
import fs from 'fs';
import { HTTP_STATUS_OK, HTTP_STATUS_NOT_FOUND, HTTP_STATUS_CONFLICT } from "../utils/httpStatusCodes";
import { applyDiscount, applyDiscounts } from "../utils/applyDiscounts";
import rawProducts from '../data/products.json';

type BasketItem = {
  productId: string;
  quantity: number;
}

export const getProducts = (req: Request, res: Response) => {
  const products = applyDiscounts(rawProducts);
  res.status(200).json(products);
};

export const checkout = (req: Request, res: Response) => {
  const basket: BasketItem[] = req.body.basket;
  for (let basketItem of basket) {
    const product = rawProducts.find(product => product.id === parseInt(basketItem.productId));
    if (!product) {
      return res.status(HTTP_STATUS_NOT_FOUND).json({message: `Could not find a product with id ${basketItem.productId}`});
    } else if (product.unitsInStock < basketItem.quantity) {
      return res.status(HTTP_STATUS_CONFLICT).json({message: `Not enough stock available to complete this request.`});
    }
  };
  for (let basketItem of basket) {
    const product = rawProducts.find(product => product.id === parseInt(basketItem.productId))!;
    product.unitsInStock = product.unitsInStock - basketItem.quantity;
  };
  fs.writeFileSync('/Users/georgeflinn/Documents/practice-projects/synanetics/server/data/products.json', JSON.stringify(rawProducts));
  res.status(HTTP_STATUS_OK).json({message: 'Order complete!'});
}

export const getTotalPriceForProduct = (req: Request, res: Response) => {
  const productId = parseInt(req.params.productId);
  const quantity = req.query['quantity'] as string;
  const product = rawProducts.find(product => product.id === productId);
  if (product) {
    const salePrice = applyDiscount(product).salePrice;
    const totalPrice = (salePrice * parseInt(quantity)).toFixed(2);
    res.status(HTTP_STATUS_OK).json({totalPrice})
  } else {
    res.status(HTTP_STATUS_NOT_FOUND).json({message: "Cannot find product with this product ID."});
  }
};

export const evaluateBasketPrice = (req: Request, res: Response) => {
  const basket: BasketItem[] = req.body.basket;
  let totalPrice = 0;
  for (let basketItem of basket) {
    const product = rawProducts.find(product => product.id === parseInt(basketItem.productId));
    if (!product) {
      res.status(HTTP_STATUS_NOT_FOUND).json({message: `Could not find a product with id ${basketItem.productId}`});
    } else {
      const salePrice = applyDiscount(product).salePrice;
      totalPrice += salePrice * basketItem.quantity;
    }
  }
  res.status(HTTP_STATUS_OK).json({totalPrice: totalPrice.toFixed(2)});
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

