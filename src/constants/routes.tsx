import React from "react";

import Products from "pages/Products/Products"
import Product from "pages/Product/Product"
import EditProduct from "pages/EditProduct/EditProduct"
import NotFound from "pages/NotFound/NotFound"
import Layout from "components/Layout/Layout"
import Chart from "pages/Chart/Chart";
import Countdown from "pages/Countdown/Countdown";

// const Products = React.lazy(() => import("../pages/Products/Products"));
// const Product = React.lazy(() => import("../pages/Product/Product"));
// const EditProduct = React.lazy(() =>
//   import("../pages/EditProduct/EditProduct")
// );
// const NotFound = React.lazy(() => import("../pages/NotFound/NotFound"));
// const Layout = React.lazy(() => import("../components/Layout/Layout"));

export const routes = [
  {
    element: <Layout />,
    path: "/",
    children: [
      {
        index: true,
        element: <Products />,
      },
      {
        path: "product",
        children: [
          {
            path: ":id",
            element: <Product />,
          },
        ],
      },
      {
        path: "edit/product",
        children: [
          {
            path: ":id",
            element: <EditProduct />,
          },
        ],
      },
      {
        path: "create",
        element: <EditProduct />,
      },
      {
        path: "charts",
        element: <Chart />,
      },
      {
        path: "count",
        element: <Countdown />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export const routesForNavbar = [
  {
    to: "/",
    label: "Products",
    ariaLabel: "product-link"
  },
  {
    to: "/create",
    label: "Create a new product",
    ariaLabel: "create-product-link"
  },
  {
    to: "/charts",
    label: "Charts",
    ariaLabel: "charts"
  },
]
