import {
  ApolloClient,
  MutationOptions as ApolloMutationOptions
} from "apollo-client";
import gql from "graphql-tag";

import * as Address from "./address";
import * as Auth from "./auth";
import * as Checkout from "./checkout";
import {
  CreateCheckout,
  CreateCheckoutVariables
} from "./types/CreateCheckout";
import {
  DeleteUserAddress,
  DeleteUserAddressVariables
} from "./types/DeleteUserAddress";

import {
  CreateUserAddress,
  CreateUserAddressVariables
} from "./types/CreateUserAddress";

import {
  SetCustomerDefaultAddress,
  SetCustomerDefaultAddressVariables
} from "./types/SetCustomerDefaultAddress";

import {
  UpdateUserAddress,
  UpdateUserAddressVariables
} from "./types/UpdateUserAddress";

import { TokenAuth, TokenAuthVariables } from "./types/TokenAuth";
import {
  UpdateCheckoutBillingAddress,
  UpdateCheckoutBillingAddressVariables
} from "./types/UpdateCheckoutBillingAddress";
import {
  UpdateCheckoutShippingAddress,
  UpdateCheckoutShippingAddressVariables
} from "./types/UpdateCheckoutShippingAddress";

export type MutationOptions<TData, TVariables> = Omit<
  ApolloMutationOptions<TData, TVariables>,
  "mutation"
>;

// TODO: Add ability to pass custom fragments to mutations
export const MUTATIONS = {
  AddressTypeUpdate: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      SetCustomerDefaultAddress,
      SetCustomerDefaultAddressVariables
    >
  ) =>
    client.mutate({
      mutation: gql`
        ${Address.setCustomerDefaultAddress}
      `,
      ...options,
    }),
  CreateCheckout: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<CreateCheckout, CreateCheckoutVariables>
  ) =>
    client.mutate({
      mutation: gql`
        ${Checkout.createCheckoutMutation}
      `,
      ...options,
    }),
  CreateUserAddress: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<CreateUserAddress, CreateUserAddressVariables>
  ) =>
    client.mutate({
      mutation: gql`
        ${Address.createUserAddress}
      `,
      ...options,
    }),
  DeleteUserAddress: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<DeleteUserAddress, DeleteUserAddressVariables>
  ) =>
    client.mutate({
      mutation: gql`
        ${Address.deleteUserAddress}
      `,
      ...options,
    }),
  TokenAuth: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<TokenAuth, TokenAuthVariables>
  ) =>
    client.mutate({
      mutation: gql`
        ${Auth.tokenAuthMutation}
      `,
      ...options,
    }),
  UpdateUserAddress: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<UpdateUserAddress, UpdateUserAddressVariables>
  ) =>
    client.mutate({
      mutation: gql`
        ${Address.updateUserAddress}
      `,
      ...options,
    }),
  UpdateCheckoutBillingAddress: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      UpdateCheckoutBillingAddress,
      UpdateCheckoutBillingAddressVariables
    >
  ) =>
    client.mutate({
      mutation: gql`
        ${Checkout.updateCheckoutBillingAddressMutation}
      `,
      ...options,
    }),
  UpdateCheckoutShippingAddress: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      UpdateCheckoutShippingAddress,
      UpdateCheckoutShippingAddressVariables
    >
  ) =>
    client.mutate({
      mutation: gql`
        ${Checkout.updateCheckoutShippingAddressMutation}
      `,
      ...options,
    }),
};

export type MUTATIONS = typeof MUTATIONS;
