import React from "react"
import { Button, Form, InputGroup } from "react-bootstrap"
import styled from "styled-components"
import { useAppDispatch } from "../../redux/hooks"
import {
  decrementProductQuantity,
  incrementProductQuantity,
  setProductQuantity,
} from "../../redux/cart/cartSlice"

type ProductQuantityProps = {
  className?: string
  quantityValue: number
  setQuantityValue?: React.Dispatch<React.SetStateAction<number>>
  productId?: number
}

function ProductQuantityInput({
  className,
  quantityValue,
  setQuantityValue,
  productId,
}: ProductQuantityProps) {
  const max = 10
  const dispatch = useAppDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = Number(event.target.value)

    if (inputValue > max) {
      inputValue = max
    }

    if (inputValue < 1) {
      inputValue = 1
    }

    if (productId) {
      dispatch(
        setProductQuantity({
          productId: productId,
          quantity: inputValue,
        }),
      )
      return
    }

    setQuantityValue!(inputValue)
  }

  const handleIncrease = () => {
    if (quantityValue < max) {
      if (productId) {
        dispatch(
          incrementProductQuantity({
            productId: productId,
          }),
        )
        return
      }
      setQuantityValue!(quantityValue + 1)
    }
  }

  const handleDecrease = () => {
    if (quantityValue > 1) {
      if (productId) {
        dispatch(
          decrementProductQuantity({
            productId: productId,
          }),
        )
        return
      }
      setQuantityValue!(quantityValue - 1)
    }
  }

  return (
    <StyledInputGroup className={className} size="sm">
      <Button
        variant="outline-secondary"
        id="button-addon1"
        onClick={handleDecrease}
      >
        -
      </Button>
      <Form.Control
        type="number"
        min={1}
        max={max}
        value={quantityValue}
        onChange={handleChange}
      />
      <Button
        variant="outline-secondary"
        id="button-addon2"
        onClick={handleIncrease}
      >
        +
      </Button>
    </StyledInputGroup>
  )
}

export default ProductQuantityInput

const StyledInputGroup = styled(InputGroup)`
  /* For Chrome, Safari, Edge, Opera */
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* For Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
`
