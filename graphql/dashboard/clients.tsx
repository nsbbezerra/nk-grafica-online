import { gql } from "urql";
import { configs } from "../../configs";

const FIND_CLIENTS_PAG = gql`
  query FindClients($page: Int!) {
    clientsConnection(skip: $page, last: 20) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        pageSize
      }
    }
    clients(orderBy: name_ASC, skip: $page, last: 20) {
      id
      name
      document
      phone
      email
      address
    }
  }
`;

export { FIND_CLIENTS_PAG };
