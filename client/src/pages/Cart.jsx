import React from 'react'
import { useCartContext } from '../context/CartContext'

const Cart = () => {

  const { cartItems } = useCartContext()

  console.log(cartItems);

  return (
    <div></div>
  )
}

export default Cart