import React, { useEffect, useState } from 'react'

const getApiBase = () => {
  const cs = import.meta.env.VITE_CODESPACE_NAME
  return cs ? `https://${cs}-8000.app.github.dev` : 'http://localhost:8000'
}
// Example API endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/

export default function Users() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const base = getApiBase()
    fetch(`${base}/api/users/`)
      .then(r => r.json())
      .then(data => {
        // Support both array and paginated responses
        setItems(Array.isArray(data) ? data : data.items || [])
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading users...</div>
  return (
    <div>
      <h3>Users</h3>
      <ul>
        {items.map(u => (
          <li key={u._id || u.id}>{u.name || u.email}</li>
        ))}
      </ul>
    </div>
  )
}
