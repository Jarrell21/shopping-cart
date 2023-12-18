import App from "../../App"
import ErrorPage from "./ErrorPage"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Products from "../Products"
import Home from "../Home/Home"
import Category from "../Category"
import Product from "../Product"

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "products/category/:categoryName",
          element: <Category />,
        },
        {
          path: "products/:productId",
          element: <Product />,
        },
      ],
      errorElement: <ErrorPage />,
    },
  ])
  return <RouterProvider router={router} />
}

export default Router
