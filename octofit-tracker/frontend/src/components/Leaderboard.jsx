import React, { useEffect, useState } from 'react'

const getApiBase = () => {
  const cs = import.meta.env.VITE_CODESPACE_NAME
  return cs ? `https://${cs}-8000.app.github.dev` : 'http://localhost:8000'
}

export default function Leaderboard() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const base = getApiBase()
    fetch(`${base}/api/leaderboard/`)
      .then(r => r.json())
      .then(data => setItems(Array.isArray(data) ? data : data.items || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading leaderboard...</div>
  return (
    <div>
      <h3>Leaderboard</h3>
      <ol>
        {items.map(entry => (
          <li key={entry._id || entry.userId}>{entry.userId?.name || entry.userId || entry.user}</li>
        ))}
      </ol>
    </div>
  )
}
