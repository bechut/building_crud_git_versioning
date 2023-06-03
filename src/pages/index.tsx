import React from "react";
import { LayoutProps } from "../routers";

const IndexPage: React.FC<LayoutProps> = (props) => {
  console.log(props);
  return <div>Index Page</div>;
};

export default IndexPage;
