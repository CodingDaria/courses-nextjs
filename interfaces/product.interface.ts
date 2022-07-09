export interface ProductCharacteristic {
  name: string;
  value: string;
}

export interface ProductReview {
  _id: string;
  name: string;
  title: string;
  description: string;
  rating: number;
  createdAt: Date;
}

export interface ProductModel {
  _id: string;
  categories: string[];
  tags: string[];
  title: string;
  link: string;
  price: number;
  credit: number;
  oldPrice: number;
  description: string;
  characteristics: ProductCharacteristic[];
  createdAt: Date;
  updatedAt: Date;
  image: string;
  initialRating: string;
  reviews: ProductReview[];
  reviewCount: number;
  reviewAvg?: number;
  advantages: string;
  disadvantages: string;
}
