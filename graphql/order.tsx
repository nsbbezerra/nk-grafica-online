import { gql } from "urql";

const CREATE_ORDER = gql`
  mutation CreateOrder(
    $client: ID!
    $total: Int!
    $payment: PaymentStatus!
    $orderStatus: String!
    $items: Json!
    $shippingValue: Float!
    $shippingId: String!
  ) {
    createOrder(
      data: {
        client: { connect: { id: $client } }
        total: $total
        payment: $payment
        orderStatus: $orderStatus
        shippingValue: $shippingValue
        items: $items
        shippingId: $shippingId
      }
    ) {
      id
    }
  }
`;

const PUBLISH_ORDER = gql`
  mutation PublishOrder($id: ID!) {
    publishOrder(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`;

const CREATE_ORDER_ITEM = gql`
  mutation CreateOrderItem(
    $name: String!
    $order: ID!
    $quantity: Int!
    $total: Int!
    $width: Float!
    $height: Float!
    $design: Boolean!
    $product: ID!
  ) {
    createOrderItem(
      data: {
        name: $name
        order: { connect: { id: $order } }
        product: { connect: { id: $product } }
        quantity: $quantity
        total: $total
        width: $width
        height: $height
        design: $design
      }
    ) {
      id
    }
  }
`;

const PUBLISH_ORDER_ITEM = gql`
  mutation PublishOrderItem($id: ID!) {
    publishOrderItem(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`;

const UPDATE_CHECKOUT_ID = gql`
  mutation UpdateOrder($id: ID!, $checkout: String!) {
    updateOrder(where: { id: $id }, data: { stripeCheckoutId: $checkout }) {
      id
    }
  }
`;

const UPDATE_INTENT_ID = gql`
  mutation UpdateOrder($id: ID!, $checkout: String!) {
    updateOrder(where: { id: $id }, data: { paymentIntentId: $checkout }) {
      id
    }
  }
`;

const FIND_ORDERS_BY_CLIENT = gql`
  query FindOrders($client: ID!) {
    orders(
      where: { client: { id: $client } }
      first: 20
      orderBy: createdAt_DESC
    ) {
      id
      total
      stripeCheckoutId
      shippingValue
      payment
      orderStatus
      shippingInformation
      createdAt
      items
      paymentIntentId
      shippingId
    }
  }
`;

const CANCEL_ORDER = gql`
  mutation CancelOrder($id: ID!) {
    updateOrder(where: { id: $id }, data: { orderStatus: "canceled" }) {
      id
    }
  }
`;

export {
  CREATE_ORDER,
  PUBLISH_ORDER,
  CREATE_ORDER_ITEM,
  PUBLISH_ORDER_ITEM,
  UPDATE_CHECKOUT_ID,
  FIND_ORDERS_BY_CLIENT,
  CANCEL_ORDER,
  UPDATE_INTENT_ID,
};
