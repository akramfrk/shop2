import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  return (
    <div className="flex gap-4 rounded-md bg-white p-4 shadow-sm">
      <Link to={`/product/${product.id}`} className="shrink-0 rounded bg-slate-50 p-2">
        <img src={product.image} alt={product.title} className="h-28 w-28 object-contain" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <Link to={`/product/${product.id}`} className="line-clamp-2 font-medium hover:text-teal-700">
          {product.title}
        </Link>
        <p className="mt-1 text-xs text-slate-500">
          Rated {product.rating.rate} by {product.rating.count} buyers
        </p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
          <button
            onClick={() => addToCart(product)}
            className="rounded border border-teal-600 px-3 py-1 text-sm text-teal-700 hover:bg-teal-600 hover:text-white"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}
