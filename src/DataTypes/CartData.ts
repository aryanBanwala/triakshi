import { Product } from "./product";

export interface CartItem{
  productId: string;
  quantity: number;
};

export interface CartItemInfo{
  productId: string,
      qty: number,
      "unitPrice": number,
      "discount": number,
      "effectivePrice": number,
      "lineTotal": number,
      "name": string,
      image:string,
      // "type": string,
      // "category": string,
      "total_quantity": string
}
export interface CartData{
  products: Product[];
  quantities: number[];
};

export function toCheckoutItem(params:CartItemInfo){
  return{
    productId: params.productId,
    quantity: params.qty,
  }
}