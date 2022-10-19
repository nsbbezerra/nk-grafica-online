import { gql } from "urql";

const CREATE_REVIEW = gql`
  mutation CreateReview(
    $name: String!
    $product: ID!
    $headline: String!
    $content: String!
    $rating: Int!
  ) {
    createReview(
      data: {
        product: { connect: { id: $product } }
        name: $name
        headline: $headline
        content: $content
        rating: $rating
      }
    ) {
      id
    }
  }
`;

const PUBLISH_REVIEW = gql`
  mutation PublishReview($id: ID!) {
    publishReview(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`;

export { CREATE_REVIEW, PUBLISH_REVIEW };
