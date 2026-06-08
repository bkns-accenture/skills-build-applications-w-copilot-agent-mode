/**
 * Seed the octofit_db database with test data
 *
 * Usage: npm run seed
 *
 * This script connects to MongoDB and populates initial data for:
 * - Users
 * - Teams
 * - Activities
 * - Leaderboard entries
 * - Workout suggestions
 */

import mongoose from 'mongoose'
import { connectDatabase } from '../config/database'
import { User } from '../models/User'
import { Team } from '../models/Team'
import { Activity } from '../models/Activity'
import { Leaderboard } from '../models/Leaderboard'
import { Workout } from '../models/Workout'

async function seed() {
  try {
    await connectDatabase()
    console.log('Seeding database...')

    // Clear existing data
    await User.deleteMany({})
    await Team.deleteMany({})
    await Activity.deleteMany({})
    await Leaderboard.deleteMany({})
    await Workout.deleteMany({})

    // Seed users
    const users = await User.insertMany([
      { name: 'Alice Johnson', email: 'alice@example.com' },
      { name: 'Bob Smith', email: 'bob@example.com' },
      { name: 'Carol White', email: 'carol@example.com' },
      { name: 'David Brown', email: 'david@example.com' }
    ])
    console.log('Created', users.length, 'users')

    // Seed team
    const team = await Team.create({
      name: 'Fitness Warriors',
      description: 'A team dedicated to fitness and health',
      members: users.slice(0, 3).map(u => u._id)
    })
    console.log('Created team:', team.name)

    // Seed activities
    const activities = await Activity.insertMany([
      { userId: users[0]._id, type: 'running', duration: 30, distance: 5, calories: 300 },
      { userId: users[0]._id, type: 'cycling', duration: 45, distance: 20, calories: 400 },
      { userId: users[1]._id, type: 'swimming', duration: 60, distance: 2, calories: 500 },
      { userId: users[2]._id, type: 'yoga', duration: 50, calories: 200 }
    ])
    console.log('Created', activities.length, 'activities')

    // Seed leaderboard
    const leaderboard = await Leaderboard.insertMany([
      { userId: users[0]._id, points: 1200 },
      { userId: users[1]._id, points: 900 },
      { userId: users[2]._id, points: 800 },
      { userId: users[3]._id, points: 500 }
    ])
    console.log('Created', leaderboard.length, 'leaderboard entries')

    // Seed workouts
    const workouts = await Workout.insertMany([
      {
        title: 'Morning Jog',
        description: 'Easy morning jogging routine',
        duration: 30,
        difficulty: 'easy',
        exercises: ['warm-up', 'jogging', 'cool-down']
      },
      {
        title: 'HIIT Cardio',
        description: 'High-intensity interval training',
        duration: 20,
        difficulty: 'hard',
        exercises: ['burpees', 'jumping jacks', 'mountain climbers', 'rest']
      },
      {
        title: 'Yoga Flow',
        description: 'Relaxing yoga session',
        duration: 45,
        difficulty: 'easy',
        exercises: ['downward dog', 'warrior pose', 'cobra stretch', 'child pose']
      },
      {
        title: 'Strength Training',
        description: 'Full body strength workout',
        duration: 60,
        difficulty: 'hard',
        exercises: ['squats', 'bench press', 'deadlifts', 'pull-ups']
      }
    ])
    console.log('Created', workouts.length, 'workouts')

    console.log('Database seeding complete!')

    await mongoose.disconnect()
    process.exit(0)
  } catch (error) {
    console.error('Seeding failed:', error)
    process.exit(1)
  }
}

seed()
