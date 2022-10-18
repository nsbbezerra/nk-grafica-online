import { gql } from "urql";

const FIND_INDEX_PAGE = gql`
  query FindProducts {
    products(where: { better: true }, last: 8) {
      id
      images {
        id
        url
      }
      description {
        html
      }
      slug
      name
      price
      information {
        html
      }
      widths
      mode
      promotional
      promoRate
    }
  }
`;

const FIND_CATEGORIES_PATH = gql`
  query MyQuery {
    categories {
      id
    }
  }
`;

const FIND_CATEGORIES = gql`
  query FindCategories {
    categories {
      id
      name
      slug
      thumbnail {
        url
      }
    }
  }
`;

const FIND_PRODUCTS_BY_CATEGORY = gql`
  query MyQuery($id: ID!) {
    category(where: { id: $id }) {
      id
      name
      products(where: { active: true }, last: 50) {
        id
        name
        slug
        price
        description {
          html
        }
        information {
          html
        }
        widths
        limit
        promoRate
        promotional
        mode
        better
        shipping
        shippingOptions
        images {
          id
          url
        }
      }
    }
  }
`;

const FIND_PRODUCTS_PATH = gql`
  query MyQuery {
    products {
      id
    }
  }
`;

const FIND_PRODUCT_INFORMATION = gql`
  query MyQuery($id: ID!) {
    product(where: { id: $id }) {
      id
      images {
        id
        url
      }
      description {
        html
      }
      slug
      name
      price
      information {
        html
      }
      widths
      mode
      promotional
      promoRate
      limit
      shipping
      shippingOptions
      reviews {
        id
        headline
        name
        rating
        content
        createdAt
      }
    }
  }
`;

export {
  FIND_INDEX_PAGE,
  FIND_CATEGORIES_PATH,
  FIND_PRODUCTS_BY_CATEGORY,
  FIND_PRODUCTS_PATH,
  FIND_PRODUCT_INFORMATION,
  FIND_CATEGORIES,
};
