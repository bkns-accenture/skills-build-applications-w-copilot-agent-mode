import { Schema, model } from 'mongoose'

interface IWorkout {
  title: string
  description: string
  duration: number
  difficulty: 'easy' | 'medium' | 'hard'
  exercises: string[]
  createdAt?: Date
  updatedAt?: Date
}

const workoutSchema = new Schema<IWorkout>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
    exercises: [{ type: String }]
  },
  { timestamps: true }
)

export const Workout = model<IWorkout>('Workout', workoutSchema)
