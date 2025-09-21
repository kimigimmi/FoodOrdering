export type Item = {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  category?: string | null;
  rating?: number | null;
  isPopular?: boolean | null;
  createdAt?: string;
  quantity?: number;
  totalPriceOfItem?: number;
};

export type CommentModel = {
  id: number;
  name: string;
  text: string;
  createdAt?: string;
};
