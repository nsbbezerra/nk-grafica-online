import { gql } from "urql";

const CREATE_CLIENT = gql`
  mutation CreateClient(
    $name: String!
    $document: String!
    $phone: String!
    $email: String!
    $password: String!
    $address: Json!
  ) {
    createClient(
      data: {
        name: $name
        document: $document
        phone: $phone
        email: $email
        password: $password
        address: $address
      }
    ) {
      id
    }
  }
`;

const PUBLISH_CLIENT = gql`
  mutation PublishClient($id: ID!) {
    publishClient(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`;

const FIND_CLIENT = gql`
  query MyQuery($email: String!) {
    client(where: { email: $email }) {
      password
      id
      name
    }
  }
`;

export { CREATE_CLIENT, PUBLISH_CLIENT, FIND_CLIENT };