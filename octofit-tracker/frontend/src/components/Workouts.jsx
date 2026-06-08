import React, { useEffect, useState } from 'react'

const getApiBase = () => {
  const cs = import.meta.env.VITE_CODESPACE_NAME
  return cs ? `https://${cs}-8000.app.github.dev` : 'http://localhost:8000'
}

export default function Workouts() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const base = getApiBase()
    fetch(`${base}/api/workouts/`)
      .then(r => r.json())
      .then(data => setItems(Array.isArray(data) ? data : data.items || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading workouts...</div>
  return (
    <div>
      <h3>Workouts</h3>
      <ul>
        {items.map(w => (
          <li key={w._id || w.id}>{w.title} ({w.difficulty})</li>
        ))}
      </ul>
    </div>
  )
}
