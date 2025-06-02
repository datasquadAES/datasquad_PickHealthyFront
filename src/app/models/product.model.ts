export interface Product {
  id: number;
  store_id: number;
  category_id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  available: boolean;
  units: number;
  image_url: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  description: string;
}

export interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
}
