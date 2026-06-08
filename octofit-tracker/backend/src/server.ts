import express from 'express'
import mongoose from 'mongoose'

const app = express()
const port = process.env.PORT ? Number(process.env.PORT) : 8000
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_tracker'

app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.listen(port, async () => {
  console.log(`Backend listening on http://localhost:${port}`)

  try {
    await mongoose.connect(mongoUri)
    console.log('Connected to MongoDB at', mongoUri)
  } catch (error) {
    console.error('MongoDB connection error:', error)
  }
})
