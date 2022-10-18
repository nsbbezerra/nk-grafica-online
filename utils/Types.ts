type RichTextProps = {
  html: string;
};

type ImageProps = {
  id: string;
  url: string;
};

interface Products {
  id: string;
  images: ImageProps[];
  description: RichTextProps;
  slug: string;
  name: string;
  price: number;
  information: RichTextProps;
  widths: number[];
  mode: "square_meter" | "unique";
  promotional: boolean;
  promoRate?: number;
  limit?: number;
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
  description: RichTextProps;
  slug: string;
  name: string;
  price: number;
  information: RichTextProps;
  widths: number[];
  mode: "square_meter" | "unique";
  promotional: boolean;
  promoRate?: number;
  limit?: number;
  reviews: ReviewsProps[];
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
};
