import React from "react"
import { ToastContainer } from "react-bootstrap"
import Toast from "react-bootstrap/Toast"

type CustomToastProps = {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

function CustomToast({ show, setShow }: CustomToastProps) {
  const toggleShow = () => setShow(!show)

  return (
    <ToastContainer position="bottom-end" className="p-5">
      <Toast
        show={show}
        onClose={toggleShow}
        bg="success"
        delay={3000}
        autohide
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body className="text-white fw-bold">
          Product added to cart!
        </Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default CustomToast
