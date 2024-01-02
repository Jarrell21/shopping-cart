import App from "../App"
import ErrorPage from "./Common/ErrorPage"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Products from "./Products"
import Home from "./Home/Home"
import Product from "./Product/Product"
import Cart from "./Cart"

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "products/:productId",
          element: <Product />,
        },
      ],
      errorElement: <ErrorPage />,
    },
    {
      path: "error",
      element: <ErrorPage />,
    },
  ])
  return <RouterProvider router={router} />
}

export default Router
