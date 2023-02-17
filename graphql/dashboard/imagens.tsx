import { gql } from "urql";

const FIND_DASHBOARD_IMAGES = gql`
  query Images {
    assets(last: 100) {
      id
      url
      width
      height
    }
  }
`;

const DELETE_IMAGE = gql`
  mutation Del($id: ID!) {
    deleteAsset(where: { id: $id }) {
      id
    }
  }
`;

export { FIND_DASHBOARD_IMAGES, DELETE_IMAGE };
