import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProduct } from '../api'
import { useCart } from '../context/CartContext'

export default function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    getProduct(id).then(setProduct).catch((e) => setError(e.message))
  }, [id])

  if (error) return <p className="text-red-600">{error}</p>
  if (!product) return <p>Loading...</p>

  return (
    <>
      <Link to="/" className="text-sm text-teal-700 hover:underline">Back to products</Link>
      <div className="mt-4 grid gap-8 md:grid-cols-5">
        <div className="rounded-md bg-white p-8 shadow-sm md:col-span-2">
          <img src={product.image} alt={product.title} className="h-80 w-full object-contain" />
        </div>
        <div className="md:col-span-3">
          <p className="text-sm capitalize text-slate-500">{product.category}</p>
          <h1 className="mt-1 text-3xl font-semibold">{product.title}</h1>
          <p className="mt-2 text-sm text-slate-500">
            Rated {product.rating.rate} by {product.rating.count} buyers
          </p>
          <p className="mt-6 leading-relaxed text-slate-700">{product.description}</p>
          <div className="mt-8 flex items-center gap-6">
            <span className="text-3xl font-semibold">${product.price.toFixed(2)}</span>
            <button
              onClick={() => addToCart(product)}
              className="rounded-md bg-teal-600 px-6 py-3 text-white hover:bg-teal-500"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
