import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Input } from "@components/atoms";
import { AddressForm } from ".";

const PROPS = {
  handleSubmit: jest.fn(),
};

const errorMessage = "This is an error";
const ERRORS = {
  errors: {
    firstName: [
      {
        field: "firstName",
        message: errorMessage,
      },
    ],
  },
};

const INITIAL_DATA = {
  address: {
    city: "New York",
    companyName: "Mirumee",
    country: "US",
    countryArea: "NY",
    firstName: "John",
    lastName: "Doe",
    phone: "555-55555",
    postalCode: "90210",
    streetAddress1: "Street line 1",
    streetAddress2: "Street line 2",
  },
};

describe("<AddressForm />", () => {
  it("exists", () => {
    const wrapper = shallow(<AddressForm {...PROPS} />);
    expect(wrapper.exists()).toEqual(true);
  });

  it("should contain error provided as prop", () => {
    const wrapper = mount(<AddressForm {...PROPS} {...ERRORS} />);

    expect(wrapper.text()).toContain(errorMessage);
  });

  it("should contain partial data if provided", () => {
    const getValue = (n: number) =>
      wrapper
        .find(Input)
        .at(n)
        .prop("value");
    const wrapper = mount(<AddressForm {...PROPS} {...INITIAL_DATA} />);

    expect(getValue(0)).toEqual(INITIAL_DATA.address.firstName);
    expect(getValue(1)).toEqual(INITIAL_DATA.address.lastName);
    expect(getValue(2)).toEqual(INITIAL_DATA.address.companyName);
    expect(getValue(3)).toEqual(INITIAL_DATA.address.phone);
    expect(getValue(4)).toEqual(INITIAL_DATA.address.streetAddress1);
    expect(getValue(5)).toEqual(INITIAL_DATA.address.streetAddress2);
    expect(getValue(6)).toEqual(INITIAL_DATA.address.city);
    expect(getValue(7)).toEqual(INITIAL_DATA.address.postalCode);
    expect(getValue(8)).toEqual(INITIAL_DATA.address.country);
    expect(getValue(9)).toEqual(INITIAL_DATA.address.countryArea);
  });
});
