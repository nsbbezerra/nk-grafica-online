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
    $price: Float!
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

const UPDATE_PRODUCT_INFORMATION = gql`
  mutation UpdateProduct(
    $name: String!
    $slug: String!
    $price: Float!
    $information: String!
    $shipping: Json!
    $destak: Boolean!
    $description: String!
    $shippingOptions: String!
    $active: Boolean!
    $promotional: Boolean!
    $promoRate: Int!
    $id: ID!
  ) {
    updateProduct(
      where: { id: $id }
      data: {
        name: $name
        description: $description
        price: $price
        shippingOptions: $shippingOptions
        slug: $slug
        shipping: $shipping
        information: $information
        promotional: $promotional
        promoRate: $promoRate
        destak: $destak
        active: $active
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
      productOptions(where: { active: true }) {
        id
        size
        colors
        active
      }
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
      productOptions(where: { active: true }) {
        id
        size
        colors
        active
      }
    }
  }
`;

const FIND_PRODUCTS_PROMOTIONAL = gql`
  query FindProductsPromo {
    products(where: { promotional: true }, last: 100) {
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
    }
  }
`;

const FIND_PRODUCTS_LOCK = gql`
  query FindProductsLock {
    products(where: { active: false }, last: 100) {
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

const PUBLISH_PRODUCT_OPT = gql`
  mutation PublishProduct($id: ID!) {
    publishProductOption(where: { id: $id }, to: PUBLISHED) {
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

const CREATE_PRODUCT_OPT = gql`
  mutation CreateProductOpt($size: String!, $colors: String!, $id: ID!) {
    createProductOption(
      data: {
        size: $size
        colors: $colors
        products: { connect: { id: $id } }
        active: true
      }
    ) {
      id
    }
  }
`;

const FIND_PRODUCT_OPT = gql`
  query FindProductOpt($id: ID!) {
    productOptions(where: { products_some: { id: $id } }, last: 20) {
      id
      size
      colors
      active
    }
  }
`;

const ACTIVE_PRODUCT_OPT = gql`
  mutation UpdateProductOpt($id: ID!, $active: Boolean!) {
    updateProductOption(where: { id: $id }, data: { active: $active }) {
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
  UPDATE_PRODUCT_INFORMATION,
  FIND_PRODUCTS_PROMOTIONAL,
  FIND_PRODUCTS_LOCK,
  CREATE_PRODUCT_OPT,
  PUBLISH_PRODUCT_OPT,
  FIND_PRODUCT_OPT,
  ACTIVE_PRODUCT_OPT,
};
