import { useState } from 'react'
import { Link } from 'react-router-dom'
import { createOrder } from '../api'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { items, total, setQty, removeFromCart, clearCart } = useCart()
  const [orderId, setOrderId] = useState(null)

  const checkout = async () => {
    const order = await createOrder({ items, total, date: new Date().toISOString() })
    setOrderId(order.id)
    clearCart()
  }

  if (orderId) {
    return (
      <div className="mx-auto max-w-md rounded-md bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold">Order placed</h1>
        <p className="mt-2 text-slate-600">Your order number is #{orderId}.</p>
        <Link to="/" className="mt-4 inline-block text-teal-700 hover:underline">Continue shopping</Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md rounded-md bg-white p-8 text-center shadow-sm">
        <p className="text-slate-600">Your cart is empty.</p>
        <Link to="/" className="mt-2 inline-block text-teal-700 hover:underline">Browse products</Link>
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-3 lg:col-span-2">
        <h1 className="text-2xl font-semibold">Your cart</h1>
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 rounded-md bg-white p-4 shadow-sm">
            <img src={item.image} alt={item.title} className="h-20 w-20 object-contain" />
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-sm font-medium">{item.title}</p>
              <p className="text-sm text-slate-500">${item.price.toFixed(2)} each</p>
              <button onClick={() => removeFromCart(item.id)} className="mt-1 text-xs text-red-600 hover:underline">
                Remove
              </button>
            </div>
            <div className="flex items-center rounded-md border border-slate-300">
              <button onClick={() => setQty(item.id, item.qty - 1)} className="px-3 py-1 hover:bg-slate-100">-</button>
              <span className="w-8 text-center text-sm">{item.qty}</span>
              <button onClick={() => setQty(item.id, item.qty + 1)} className="px-3 py-1 hover:bg-slate-100">+</button>
            </div>
            <p className="w-24 text-right font-medium">${(item.price * item.qty).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <aside className="h-fit rounded-md bg-slate-900 p-6 text-white lg:sticky lg:top-6">
        <h2 className="text-lg font-semibold">Summary</h2>
        <div className="mt-4 flex justify-between border-t border-slate-700 pt-4 text-xl">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button onClick={checkout} className="mt-6 w-full rounded-md bg-teal-600 py-3 hover:bg-teal-500">
          Place order
        </button>
      </aside>
    </div>
  )
}
