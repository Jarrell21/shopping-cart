import Header from "./components/Common/Header"
import "bootstrap/dist/css/bootstrap.min.css"
import { Stack } from "react-bootstrap"
import { Outlet } from "react-router-dom"
import GlobalStyle from "./styles/GlobalStyle"

function App() {
  return (
    <Stack className="min-vh-100 vh-100">
      <GlobalStyle />
      <Header />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </Stack>
  )
}

export default App
