import gql from "graphql-tag";

import { checkoutFragment } from "../fragments/checkout";
import { paymentFragment } from "../fragments/payment";
import { orderDetailFragment } from "../fragments/user";

export const updateCheckoutLineMutation = gql`
  ${checkoutFragment}
  mutation UpdateCheckoutLine($checkoutId: ID!, $lines: [CheckoutLineInput]!) {
    checkoutLinesUpdate(checkoutId: $checkoutId, lines: $lines) {
      checkout {
        ...Checkout
      }
      errors: checkoutErrors {
        code
        field
        message
      }
    }
  }
`;

export const createCheckoutMutation = gql`
  ${checkoutFragment}
  mutation CreateCheckout($checkoutInput: CheckoutCreateInput!) {
    checkoutCreate(input: $checkoutInput) {
      errors: checkoutErrors {
        code
        field
        message
      }
      checkout {
        ...Checkout
      }
    }
  }
`;

export const updateCheckoutBillingAddressWithEmailMutation = gql`
  ${checkoutFragment}
  mutation UpdateCheckoutBillingAddressWithEmail(
    $checkoutId: ID!
    $billingAddress: AddressInput!
    $email: String!
  ) {
    checkoutBillingAddressUpdate(
      checkoutId: $checkoutId
      billingAddress: $billingAddress
    ) {
      errors: checkoutErrors {
        code
        field
        message
      }
      checkout {
        ...Checkout
      }
    }
    checkoutEmailUpdate(checkoutId: $checkoutId, email: $email) {
      checkout {
        ...Checkout
      }
      errors: checkoutErrors {
        code
        field
        message
      }
    }
  }
`;

export const updateCheckoutBillingAddressMutation = gql`
  ${checkoutFragment}
  mutation UpdateCheckoutBillingAddress(
    $checkoutId: ID!
    $billingAddress: AddressInput!
  ) {
    checkoutBillingAddressUpdate(
      checkoutId: $checkoutId
      billingAddress: $billingAddress
    ) {
      errors: checkoutErrors {
        code
        field
        message
      }
      checkout {
        ...Checkout
      }
    }
  }
`;

export const updateCheckoutShippingAddressMutation = gql`
  ${checkoutFragment}
  mutation UpdateCheckoutShippingAddress(
    $checkoutId: ID!
    $shippingAddress: AddressInput!
    $email: String!
  ) {
    checkoutShippingAddressUpdate(
      checkoutId: $checkoutId
      shippingAddress: $shippingAddress
    ) {
      errors: checkoutErrors {
        code
        field
        message
      }
      checkout {
        ...Checkout
      }
    }
    checkoutEmailUpdate(checkoutId: $checkoutId, email: $email) {
      checkout {
        ...Checkout
      }
      errors: checkoutErrors {
        code
        field
        message
      }
    }
  }
`;

export const updateCheckoutShippingMethodMutation = gql`
  ${checkoutFragment}
  mutation UpdateCheckoutShippingMethod(
    $checkoutId: ID!
    $shippingMethodId: ID!
  ) {
    checkoutShippingMethodUpdate(
      checkoutId: $checkoutId
      shippingMethodId: $shippingMethodId
    ) {
      checkout {
        ...Checkout
      }
      errors: checkoutErrors {
        code
        field
        message
      }
    }
  }
`;

export const addCheckoutPromoCode = gql`
  ${checkoutFragment}
  mutation AddCheckoutPromoCode($checkoutId: ID!, $promoCode: String!) {
    checkoutAddPromoCode(checkoutId: $checkoutId, promoCode: $promoCode) {
      checkout {
        ...Checkout
      }
      errors: checkoutErrors {
        code
        field
        message
      }
    }
  }
`;

export const removeCheckoutPromoCode = gql`
  ${checkoutFragment}
  mutation RemoveCheckoutPromoCode($checkoutId: ID!, $promoCode: String!) {
    checkoutRemovePromoCode(checkoutId: $checkoutId, promoCode: $promoCode) {
      checkout {
        ...Checkout
      }
      errors: checkoutErrors {
        code
        field
        message
      }
    }
  }
`;

export const createCheckoutPaymentMutation = gql`
  ${checkoutFragment}
  ${paymentFragment}
  mutation CreateCheckoutPayment(
    $checkoutId: ID!
    $paymentInput: PaymentInput!
  ) {
    checkoutPaymentCreate(checkoutId: $checkoutId, input: $paymentInput) {
      checkout {
        ...Checkout
      }
      payment {
        ...Payment
      }
      errors: paymentErrors {
        code
        field
        message
      }
    }
  }
`;

export const completeCheckoutMutation = gql`
  ${orderDetailFragment}
  mutation CompleteCheckout($checkoutId: ID!) {
    checkoutComplete(checkoutId: $checkoutId) {
      errors: checkoutErrors {
        code
        field
        message
      }
      order {
        ...OrderDetail
      }
    }
  }
`;
