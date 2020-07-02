export interface Cart {
  id: string;
  userid: string;
  products: Product[];
  isCartEmpty: boolean;
  cartItemsLength: number;
  productsSubtotal: number;
}
export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  quantity: number;
}
