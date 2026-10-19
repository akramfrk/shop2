import { useEffect, useState } from 'react'
import { getProducts } from '../api'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('default')

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError('Could not load products. Is json-server running on port 3001?'))
      .finally(() => setLoading(false))
  }, [])

  const categories = ['all', ...new Set(products.map((p) => p.category))]

  const visible = products
    .filter((p) => category === 'all' || p.category === category)
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'rating') return b.rating.rate - a.rating.rate
      return 0
    })

  if (loading) return <p>Loading...</p>
  if (error) return <p className="text-red-600">{error}</p>

  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <aside className="md:w-56 md:shrink-0">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products"
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2"
        />
        <h3 className="mt-6 mb-2 font-semibold">Categories</h3>
        <ul className="flex flex-wrap gap-2 md:flex-col md:gap-1">
          {categories.map((c) => (
            <li key={c}>
              <button
                onClick={() => setCategory(c)}
                className={`w-full rounded-md px-3 py-2 text-left text-sm capitalize ${
                  category === c ? 'bg-slate-900 text-white' : 'bg-white hover:bg-slate-200'
                }`}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <section className="flex-1">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-slate-500">{visible.length} products</p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
          >
            <option value="default">Sort by</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating">Best rated</option>
          </select>
        </div>

        {visible.length === 0 ? (
          <p className="text-slate-500">No products match your search.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
