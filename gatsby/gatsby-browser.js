import React from "react";
import Layout from "./src/components/Layout";
import { OrderProvider } from "./src/components/OrderContext";

function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}

function wrapRootElement({ element }) {
  return <OrderProvider>{element}</OrderProvider>;
}

export { wrapPageElement, wrapRootElement };
