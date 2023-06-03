import React, { cloneElement } from "react";
import _ from "lodash";

const NonAuthLayout: React.FC<any> = (props) => {
  return <div>{cloneElement(props.children, { ..._.omit(props, "children") })}</div>;
};

export default NonAuthLayout;
