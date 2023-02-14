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
      }
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

export { CREATE_CATEGORY, PUBLISH_CATEGORY };
