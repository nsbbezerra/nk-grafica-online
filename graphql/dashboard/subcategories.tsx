import { gql } from "urql";

const GET_ALL_CATEGORIES = gql`
  query FindCategories {
    categories(orderBy: name_ASC) {
      id
      name
    }
  }
`;

const CREATE_SUBCATEGORY = gql`
  mutation CreateSubCategory(
    $name: String!
    $slug: String!
    $description: String!
    $id: ID!
  ) {
    createCollection(
      data: {
        name: $name
        slug: $slug
        description: $description
        category: { connect: { id: $id } }
        active: true
      }
    ) {
      id
    }
  }
`;

const PUBLISH_SUBCATEGORY = gql`
  mutation PublishSubCategory($id: ID!) {
    publishCollection(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`;

const FIND_SUB_CATEGORIES = gql`
  query FindSubCategories {
    collections(last: 100, orderBy: name_ASC) {
      id
      name
      slug
      active
      description
      category {
        id
        name
      }
    }
  }
`;

const UPDATE_SUB_CATEGORY = gql`
  mutation UpdateSubCategory(
    $id: ID!
    $name: String!
    $slug: String!
    $description: String!
  ) {
    updateCollection(
      where: { id: $id }
      data: { name: $name, slug: $slug, description: $description }
    ) {
      id
    }
  }
`;

export {
  GET_ALL_CATEGORIES,
  CREATE_SUBCATEGORY,
  PUBLISH_SUBCATEGORY,
  FIND_SUB_CATEGORIES,
  UPDATE_SUB_CATEGORY,
};
