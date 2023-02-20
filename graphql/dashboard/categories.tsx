import { gql } from "urql";

const CREATE_CATEGORY = gql`
  mutation CreateCategory(
    $name: String!
    $slug: String!
    $description: String!
    $imageId: ID!
  ) {
    createCategory(
      data: {
        name: $name
        slug: $slug
        description: $description
        thumbnail: { connect: { id: $imageId } }
        active: true
      }
    ) {
      id
    }
  }
`;

const FIND_DASHBOARD_CATEGORIES = gql`
  query FindCategories {
    categories(last: 100, orderBy: name_ASC) {
      id
      thumbnail {
        id
        url
        width
        height
      }
      name
      slug
      description
    }
    assets(last: 100) {
      id
      url
      width
      height
    }
  }
`;

const UPDATE_CATEGORY_INFO = gql`
  mutation UpdateCategory(
    $id: ID!
    $name: String!
    $description: String!
    $slug: String!
  ) {
    updateCategory(
      where: { id: $id }
      data: { name: $name, description: $description, slug: $slug }
    ) {
      id
    }
  }
`;

const UPDATE_CATEGORY_IMAGE = gql`
  mutation UpdateImage($id: ID!, $imageId: ID!) {
    updateCategory(
      where: { id: $id }
      data: { thumbnail: { connect: { id: $imageId } } }
    ) {
      id
    }
  }
`;

const PUBLISH_CATEGORY = gql`
  mutation PublishCategory($id: ID!) {
    publishCategory(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`;

export {
  CREATE_CATEGORY,
  PUBLISH_CATEGORY,
  FIND_DASHBOARD_CATEGORIES,
  UPDATE_CATEGORY_IMAGE,
  UPDATE_CATEGORY_INFO,
};
