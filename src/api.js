const API = 'http://localhost:3001'

export const getProducts = () => fetch(`${API}/products`).then((r) => r.json())

export const getProduct = (id) =>
  fetch(`${API}/products/${id}`).then((r) => {
    if (!r.ok) throw new Error('Product not found')
    return r.json()
  })

export const createOrder = (order) =>
  fetch(`${API}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  }).then((r) => r.json())
