import express from 'express'
import { connectDatabase } from './config/database'
import usersRouter from './routes/users'
import teamsRouter from './routes/teams'
import activitiesRouter from './routes/activities'
import leaderboardRouter from './routes/leaderboard'
import workoutsRouter from './routes/workouts'

const app = express()
const port = process.env.PORT ? Number(process.env.PORT) : 8000

// Build API base URL based on environment
const apiBaseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${port}`

app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', apiBaseUrl })
})

app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

app.listen(port, async () => {
  console.log(`Backend listening on http://localhost:${port}`)
  console.log(`API Base URL: ${apiBaseUrl}`)

  try {
    await connectDatabase()
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
})
