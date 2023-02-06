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
      address
      email
      phone
    }
  }
`;

const FIND_CLIENT_INFO = gql`
  query FindClient($client: ID!) {
    client(where: { id: $client }) {
      id
      name
      document
      phone
      email
      address
    }
  }
`;

const UPDATE_CLIENT = gql`
  mutation Update(
    $id: ID!
    $name: String!
    $phone: String!
    $email: String!
    $address: Json!
  ) {
    updateClient(
      where: { id: $id }
      data: { email: $email, phone: $phone, address: $address, name: $name }
    ) {
      id
      name
      phone
      email
      address
    }
  }
`;

export {
  CREATE_CLIENT,
  PUBLISH_CLIENT,
  FIND_CLIENT,
  FIND_CLIENT_INFO,
  UPDATE_CLIENT,
};
