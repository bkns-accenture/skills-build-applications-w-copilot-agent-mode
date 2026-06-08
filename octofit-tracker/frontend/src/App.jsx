import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Users from './components/Users'
import Teams from './components/Teams'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Workouts from './components/Workouts'

export default function App() {
  return (
    <div>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/users" style={{ marginRight: '1rem' }}>Users</Link>
        <Link to="/teams" style={{ marginRight: '1rem' }}>Teams</Link>
        <Link to="/activities" style={{ marginRight: '1rem' }}>Activities</Link>
        <Link to="/leaderboard" style={{ marginRight: '1rem' }}>Leaderboard</Link>
        <Link to="/workouts" style={{ marginRight: '1rem' }}>Workouts</Link>
      </nav>

      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<div><h2>Octofit Tracker</h2><p>Welcome to the app.</p></div>} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}
