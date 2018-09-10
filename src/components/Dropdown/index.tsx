import * as React from "react";
import Select from "react-select";

import "./scss/index.scss";

const Dropdown: React.SFC<{ [x: string]: any }> = props => (
  <Select
    classNamePrefix="dropdown"
    className="dropdown-component"
    {...props}
  />
);

export default Dropdown;
