import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { StripeCreditCardForm } from ".";

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

describe("<StripeCreditCardForm />", () => {
  it("renders", () => {
    const processPayment = jest.fn();
    const wrapper = shallow(
      <Elements stripe={stripePromise}>
        <StripeCreditCardForm processPayment={processPayment} />
      </Elements>
    );

    expect(wrapper.exists()).toEqual(true);
  });
});
