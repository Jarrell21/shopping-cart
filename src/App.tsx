import Header from "./components/Common/Header"
import Footer from "./components/Common/Footer"
import "bootstrap/dist/css/bootstrap.min.css"
import { Stack } from "react-bootstrap"
import { Outlet } from "react-router-dom"
import GlobalStyle from "./styles/GlobalStyle"

function App() {
  return (
    <Stack style={{ minHeight: "100vh" }}>
      <GlobalStyle />
      <Header />
      <Outlet />
      <Footer />
    </Stack>
  )
}

export default App
