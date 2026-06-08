import { Schema, model } from 'mongoose'

interface IUser {
  name: string
  email: string
  avatar?: string
  teamId?: Schema.Types.ObjectId
  createdAt?: Date
  updatedAt?: Date
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' }
  },
  { timestamps: true }
)

export const User = model<IUser>('User', userSchema)
