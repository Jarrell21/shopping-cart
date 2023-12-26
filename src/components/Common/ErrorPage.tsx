import { Stack } from "react-bootstrap"
import { Link, useLocation } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

const ErrorPage = () => {
  const location = useLocation()
  const errorMessage =
    location.state?.error || "Oh no, this page doesn't exist!"

  return (
    <Stack className="min-vh-100 vh-100">
      <Header />
      <Stack className="justify-content-center align-items-center">
        <h1>{errorMessage}</h1>
        <p>
          You can go back to the home page by clicking
          <Link to="/">here</Link>, though!
        </p>
      </Stack>
      <Footer />
    </Stack>
  )
}

export default ErrorPage
