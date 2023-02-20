import { gql } from "urql";

const FIND_INDEX_PAGE = gql`
  query FindProducts {
    products(where: { destak: true }, last: 24) {
      id
      thumbnail {
        id
        url
      }
      description
      slug
      name
      price
      shippingOptions
      information
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
      slug
    }
  }
`;

const FIND_PRODUCT_INFORMATION = gql`
  query MyQuery($id: String!) {
    products(where: { slug: $id }) {
      id
      name
      information
      active
      destak
      description
      thumbnail {
        id
        url
        width
        height
      }
      slug
      price
      shipping
      shippingOptions
      category {
        id
        name
      }
      collection {
        id
        name
      }
      promotional
      promoRate
      productOptions(where: { active: true }) {
        id
        size
        colors
        active
      }
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
    categories(where: { active: true }, last: 50, orderBy: name_ASC) {
      id
      name
      products(where: { active: true }, last: 50, orderBy: name_ASC) {
        id
        name
        slug
        price
        description
        information
        promoRate
        promotional
        shipping
        shippingOptions
        thumbnail {
          id
          url
        }
      }
      collections(where: { active: true }, last: 50, orderBy: name_ASC) {
        id
        name
        slug
      }
    }
  }
`;

const FIND_COLLECTION_PATH = gql`
  query FindCollections {
    collections(last: 10, where: { active: true }) {
      id
      slug
    }
  }
`;

const FIND_COLLECTION_PRODUCTS = gql`
  query FindCollections($id: String!) {
    collections(where: { slug: $id }) {
      id
      slug
      name
      category {
        id
        name
      }
      products(where: { active: true }, last: 50, orderBy: name_ASC) {
        id
        name
        slug
        price
        description
        information
        promoRate
        promotional
        shipping
        shippingOptions
        thumbnail {
          id
          url
        }
      }
    }
    categories(where: { active: true }, last: 50, orderBy: name_ASC) {
      id
      name
      collections(where: { active: true }, last: 50, orderBy: name_ASC) {
        id
        name
        slug
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
  FIND_COLLECTION_PATH,
  FIND_COLLECTION_PRODUCTS,
};
