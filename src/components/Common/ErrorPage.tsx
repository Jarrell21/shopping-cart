import { Stack } from "react-bootstrap"
import { Link } from "react-router-dom"

const ErrorPage = () => {
  return (
    <Stack className="justify-content-center align-items-center vh-100">
      <h1>Oh no, this page doesn't exist!</h1>
      <p>
        You can go back to the home page by clicking <Link to="/">here</Link>,
        though!
      </p>
    </Stack>
  )
}

export default ErrorPage
