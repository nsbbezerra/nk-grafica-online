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

export type { ProductProps, CategoriesProps, IndexProps };
