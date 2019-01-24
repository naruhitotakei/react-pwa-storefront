import "./scss/index.scss";

import * as React from "react";
import { RouteComponentProps, generatePath } from "react-router";

import { Button } from "../../../components";
import { maybe } from "../../../core/utils";
import { Steps } from "../../components";
import {
  CheckoutContext,
  CheckoutContextInterface,
  CheckoutStep
} from "../../context";
import { billingUrl } from "../../routes";
import { TypedUpdateCheckoutShippingOptionsMutation } from "./queries";
import ShippingOptionsList from "./ShippingOptionsList";
import { updateCheckoutShippingOptions } from "./types/updateCheckoutShippingOptions";

class View extends React.Component<
  RouteComponentProps<{ token?: string }>,
  { selectedShipping: string }
> {
  state = { selectedShipping: "" };

  proceedToBilling(
    data: updateCheckoutShippingOptions,
    update: (checkoutData: CheckoutContextInterface) => void,
    token?: string
  ) {
    const canProceed = !data.checkoutShippingMethodUpdate.errors.length;

    if (canProceed) {
      update({
        checkout: data.checkoutShippingMethodUpdate.checkout,
        step: CheckoutStep.BillingAddress
      });
      this.props.history.push(generatePath(billingUrl, { token }));
    }
  }

  handleShippngChange = (shippingId: string) => {
    this.setState({ selectedShipping: shippingId });
  };

  render() {
    const { selectedShipping } = this.state;
    const {
      params: { token },
      path
    } = this.props.match;

    return (
      <div className="checkout-shipping-options">
        <CheckoutContext.Consumer>
          {({ checkout, update }) => (
            <Steps path={path} token={token} checkout={checkout}>
              <TypedUpdateCheckoutShippingOptionsMutation
                onCompleted={data => this.proceedToBilling(data, update, token)}
              >
                {(updateCheckoutShippingOptions, { loading }) => {
                  return (
                    <div className="checkout__content">
                      <ShippingOptionsList
                        checkout={checkout}
                        selected={selectedShipping}
                        onShippingSelect={this.handleShippngChange}
                      />
                      <Button
                        onClick={event => {
                          updateCheckoutShippingOptions({
                            variables: {
                              checkoutId: checkout.id,
                              shippingMethodId: selectedShipping
                            }
                          });
                          event.preventDefault();
                        }}
                        disabled={
                          loading ||
                          maybe(
                            () => !checkout.availableShippingMethods.length
                          ) ||
                          !selectedShipping
                        }
                      >
                        {loading ? "Loading" : "Continue to billing"}
                      </Button>
                    </div>
                  );
                }}
              </TypedUpdateCheckoutShippingOptionsMutation>
            </Steps>
          )}
        </CheckoutContext.Consumer>
      </div>
    );
  }
}

export default View;
