import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { count } = useCart()
  return (
    <>
      <header className="bg-slate-900 py-6 text-center">
        <Link to="/" className="text-2xl font-semibold tracking-wide text-white">
          Store
        </Link>
      </header>
      <Link
        to="/cart"
        className="fixed bottom-6 right-6 z-10 flex items-center gap-2 rounded-full bg-teal-600 px-5 py-3 text-sm font-medium text-white shadow-lg hover:bg-teal-500"
      >
        Cart
        <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-teal-700">{count}</span>
      </Link>
    </>
  )
}
