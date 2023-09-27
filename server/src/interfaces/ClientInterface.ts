import { Document } from 'mongoose';

export interface ClientInterface extends Document {
  _id: string;
  name: string;
  email: string;
  phone: string;
}
