import mongoose, { Document } from 'mongoose';

export interface ProjectInterface extends Document {
  _id: string;
  name: string;
  description: string;
  status: string;
  clientId: mongoose.Schema.Types.ObjectId;
}
