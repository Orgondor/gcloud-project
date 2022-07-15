import * as React from "react";
import { Redirect } from "react-router-dom";

const BaseRedirect: React.FC = () => {
  return <Redirect to={"/shaders"} />;
};

export default BaseRedirect;
