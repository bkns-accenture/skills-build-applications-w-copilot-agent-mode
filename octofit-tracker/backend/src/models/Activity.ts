import { Schema, model } from 'mongoose'

interface IActivity {
  userId: Schema.Types.ObjectId
  type: string
  duration: number
  distance?: number
  calories?: number
  description?: string
  createdAt?: Date
  updatedAt?: Date
}

const activitySchema = new Schema<IActivity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    distance: { type: Number },
    calories: { type: Number },
    description: { type: String }
  },
  { timestamps: true }
)

export const Activity = model<IActivity>('Activity', activitySchema)
