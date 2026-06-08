import React, { useEffect, useState } from 'react'

const getApiBase = () => {
  const cs = import.meta.env.VITE_CODESPACE_NAME
  return cs ? `https://${cs}-8000.app.github.dev` : 'http://localhost:8000'
}

export default function Teams() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const base = getApiBase()
    fetch(`${base}/api/teams/`)
      .then(r => r.json())
      .then(data => setItems(Array.isArray(data) ? data : data.items || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading teams...</div>
  return (
    <div>
      <h3>Teams</h3>
      <ul>
        {items.map(t => (
          <li key={t._id || t.id}>{t.name}</li>
        ))}
      </ul>
    </div>
  )
}
