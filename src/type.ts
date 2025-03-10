export interface Product {
  _id: string; // Optional since MongoDB assigns it automatically
  name: string;
  description?: string;
  details?: string;
  price: number;
  size: string[];
  color: string[];
  images: string[];
  ShortDescription?: string;
  discount?: number;
  stock: number;
  categories: Category[]; // Store category IDs as strings
  ratings?: string[]; // Store rating IDs as strings
  created_at?: Date;
}

export type Category = {
  _id: string;
  name: string;
  image: string;
  products?: Product[];
  created_at: Date;
};

export interface CartItem {
  id: string;
  name: string;
  price: number;
  size?: string;
  color?: string;
  image: string;
  quantity: number;
}

export interface reviewsItem {
  _id: string;
  fullName: string;
  email: string;
  rating: number;
  comment: string;
  product: Product;
  created_at: Date;
}

export interface orderItem {
  _id: string;
  fullName: string;
  email: string;
  orderCode: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
  country: string;
  products: {
    _id: string;
    color: string;
    quantity: number;
    size: string;
    totalPrice: number;
    product: Product;
  }[];
  status: string;
  totalPrice: number;
  totalItems: number;
  createdAt: Date;
}

export interface submitOrder {
  fullName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
  country: string;
  products: {
    product: string;
    quantity: number;
    totalPrice: number;
    size?: string;
    color?: string;
  }[]; 
  totalItems: number;
  totalPrice: number;
}


export interface productOrder {
  product: string;
  quantity: number;
  image: string;
  name: string;
  price: number;
  size?: string;
  color?: string;
  totalPrice: number;
}
