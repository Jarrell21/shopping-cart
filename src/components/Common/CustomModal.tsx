import { Button, Modal } from "react-bootstrap"

type CustomModalProps = {
  show: boolean
  onConfirm: () => void
  onCancel?: () => void
  content: string
}

function CustomModal({ show, onConfirm, onCancel, content }: CustomModalProps) {
  return (
    <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body className="m-2">
        <p className="text-center m-0">{content}</p>
      </Modal.Body>
      <Modal.Footer>
        {onCancel && (
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button variant="danger" onClick={onConfirm}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CustomModal
