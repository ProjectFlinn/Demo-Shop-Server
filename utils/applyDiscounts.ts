import discountsProductMapping from "../data/discountProductMapping.json";
import discounts from "../data/discounts.json";

type Product = {
  id: number;
  name: string;
  description: string;
  unitsInStock: number;
  basePrice: number;
};

export const applyDiscount = (product: Product) => {
  let discountId: number | undefined;
  for (let mapping of discountsProductMapping) {
    if (product.id === mapping.productId) {
      discountId = mapping.discountId;
      break;
    }
  }
  const discount = discounts.find((discount) => discount.id === discountId);
  let salePrice = discount?.amount ? (1 - discount!.amount) * product.basePrice : product.basePrice;
  salePrice = +salePrice.toFixed(2);
  return {
    ...product,
    salePrice,
  };
};

export const applyDiscounts = (products: Product[]) => {
  return products.map(applyDiscount);
};
