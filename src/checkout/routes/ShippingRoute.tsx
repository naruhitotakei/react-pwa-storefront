import * as React from "react";

import { StepCheck } from "../components";
import { Shipping } from "../views";

export const ShippingRoute = props => {
  return (
    <StepCheck>
      <Shipping {...props} />
    </StepCheck>
  );
};
