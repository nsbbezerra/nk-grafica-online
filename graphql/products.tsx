import { gql } from "urql";

const FIND_INDEX_PAGE = gql`
  query FindProducts {
    products {
      id
      images {
        id
        url
      }
      description {
        html
      }
      slug
      name
      price
      information {
        html
      }
      widths
      mode
      promotional
      promoRate
    }
    categories {
      id
      name
      description
      thumbnail {
        id
        url
      }
    }
  }
`;

export { FIND_INDEX_PAGE };
