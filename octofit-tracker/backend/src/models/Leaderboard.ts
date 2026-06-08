import { Schema, model } from 'mongoose'

interface ILeaderboard {
  userId: Schema.Types.ObjectId
  points: number
  rank?: number
  createdAt?: Date
  updatedAt?: Date
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    points: { type: Number, default: 0 },
    rank: { type: Number }
  },
  { timestamps: true }
)

export const Leaderboard = model<ILeaderboard>('Leaderboard', leaderboardSchema)
