import { gql } from "urql";

const FIND_CATEGORIES_AND_SUBCATEGORIES = gql`
  query FindCategories {
    categories(last: 100, orderBy: name_ASC) {
      id
      name
    }
    collections(last: 100, orderBy: name_ASC) {
      id
      name
      category {
        id
      }
    }
    assets(last: 100) {
      id
      url
      width
      height
    }
  }
`;

const SAVE_PRODUCT = gql`
  mutation SaveProduct(
    $name: String!
    $slug: String!
    $price: Int!
    $imageId: ID!
    $information: String!
    $shipping: Json!
    $destak: Boolean!
    $description: String!
    $shippingOptions: String!
    $categoryId: ID!
    $subCategoryId: ID!
  ) {
    createProduct(
      data: {
        name: $name
        slug: $slug
        price: $price
        thumbnail: { connect: { id: $imageId } }
        information: $information
        shipping: $shipping
        destak: $destak
        description: $description
        shippingOptions: $shippingOptions
        category: { connect: { id: $categoryId } }
        collection: { connect: { id: $subCategoryId } }
        promotional: false
        active: true
      }
    ) {
      id
    }
  }
`;

const FIND_PRODUCTS_PAG = gql`
  query FindProducts($page: Int!) {
    productsConnection(skip: $page, first: 20) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        pageSize
      }
    }
    products(skip: $page, first: 20) {
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
    }
  }
`;

const FIND_PRODUCTS_BY_NAME = gql`
  query FindProducts($name: String!) {
    products(where: { name_contains: $name }) {
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
    }
  }
`;

const PUBLISH_PRODUCT = gql`
  mutation PublishProduct($id: ID!) {
    publishProduct(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`;

const UPDATE_PRODUCT_IMAGE = gql`
  mutation UpdateImage($id: ID!, $imageId: ID!) {
    updateProduct(
      where: { id: $id }
      data: { thumbnail: { connect: { id: $imageId } } }
    ) {
      id
    }
  }
`;

export {
  FIND_CATEGORIES_AND_SUBCATEGORIES,
  PUBLISH_PRODUCT,
  SAVE_PRODUCT,
  FIND_PRODUCTS_PAG,
  FIND_PRODUCTS_BY_NAME,
  UPDATE_PRODUCT_IMAGE,
};
