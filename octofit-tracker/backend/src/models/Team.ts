import { Schema, model } from 'mongoose'

interface ITeam {
  name: string
  description?: string
  members: Schema.Types.ObjectId[]
  createdAt?: Date
  updatedAt?: Date
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true },
    description: { type: String },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
)

export const Team = model<ITeam>('Team', teamSchema)
