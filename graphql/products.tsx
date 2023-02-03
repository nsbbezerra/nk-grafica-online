import { gql } from "urql";

const FIND_INDEX_PAGE = gql`
  query FindProducts {
    products(where: { destak: true }, last: 24) {
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
      shippingOptions
      information {
        html
      }
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
        promoRate
        promotional
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
      promotional
      promoRate
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

const FIND_ALL_ITEMS = gql`
  query FindAll {
    categories(last: 50) {
      id
      name
      products {
        id
        name
        slug
        price
        categories {
          id
        }
        description {
          html
        }
        information {
          html
        }
        promoRate
        promotional
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

export {
  FIND_INDEX_PAGE,
  FIND_CATEGORIES_PATH,
  FIND_PRODUCTS_BY_CATEGORY,
  FIND_PRODUCTS_PATH,
  FIND_PRODUCT_INFORMATION,
  FIND_CATEGORIES,
  FIND_ALL_ITEMS,
};
