type ImageProps = {
  id: string;
  url: string;
};

type ShippingProps = {
  width: number;
  height: number;
  lenght: number;
  weight: number;
};

interface ProductOptionsProps {
  id: string;
  size: string;
  colors?: string;
  active: boolean;
}

interface Products {
  id: string;
  thumbnail: { id: string; url: string };
  category: { id: string; name: string };
  collection: { id: string; name: string };
  description: string;
  slug: string;
  name: string;
  price: number;
  information: string;
  promotional: boolean;
  promoRate?: number;
  destak: boolean;
  shipping: ShippingProps;
  shippingOptions: "fast" | "slow";
  reviews: ReviewsProps[];
  productOptions: ProductOptionsProps[];
}

type ReviewsProps = {
  id: string;
  headline: string;
  name: string;
  rating: number;
  content: string;
  createdAt: Date;
};

interface ProductsInfoProps {
  id: string;
  images: ImageProps[];
  description: string;
  slug: string;
  name: string;
  price: number;
  information: string;
  promotional: boolean;
  promoRate?: number;
  destak: boolean;
  reviews: ReviewsProps[];
  shipping: ShippingProps;
  shippingOptions: "fast" | "slow";
}

interface ProductProps {
  products?: Products[];
}

type ThumbnailProps = {
  id: string;
  url: string;
};

interface Categories {
  id: string;
  name: string;
  description: string;
  thumbnail: ThumbnailProps;
}

interface CategoriesProps {
  categories?: Categories[];
}

interface IndexProps {
  products?: Products[];
  categories?: Categories[];
}

export type {
  ProductProps,
  CategoriesProps,
  IndexProps,
  Products,
  ProductsInfoProps,
  ShippingProps,
  ProductOptionsProps,
};

const calcDiscount = (price: number, discount: number) => {
  let calculate = price * ((100 - discount) / 100);
  return Number(calculate.toFixed(2)).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};

export { calcDiscount };
