import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem('cart')) || [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const addToCart = (product) =>
    setItems((prev) => {
      const found = prev.find((i) => i.id === product.id)
      if (found) return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
      const { id, title, price, image } = product
      return [...prev, { id, title, price, image, qty: 1 }]
    })

  const setQty = (id, qty) =>
    setItems((prev) =>
      qty < 1 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty } : i))
    )

  const removeFromCart = (id) => setItems((prev) => prev.filter((i) => i.id !== id))
  const clearCart = () => setItems([])

  const count = items.reduce((sum, i) => sum + i.qty, 0)
  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0)

  return (
    <CartContext.Provider value={{ items, count, total, addToCart, setQty, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
