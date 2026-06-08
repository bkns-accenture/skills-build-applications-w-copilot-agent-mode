import React, { useEffect, useState } from 'react'

const getApiBase = () => {
  const cs = import.meta.env.VITE_CODESPACE_NAME
  return cs ? `https://${cs}-8000.app.github.dev` : 'http://localhost:8000'
}
// Example API endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/

export default function Activities() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const base = getApiBase()
    fetch(`${base}/api/activities/`)
      .then(r => r.json())
      .then(data => setItems(Array.isArray(data) ? data : data.items || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading activities...</div>
  return (
    <div>
      <h3>Activities</h3>
      <ul>
        {items.map(a => (
          <li key={a._id || a.id}>{a.type} - {a.duration} mins</li>
        ))}
      </ul>
    </div>
  )
}
