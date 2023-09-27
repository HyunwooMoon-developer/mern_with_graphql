import { Schema, model } from 'mongoose';
import { ClientInterface } from '../interfaces/ClientInterface';

const ClientSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

const ClientModel = model<ClientInterface>('Client', ClientSchema);

export default ClientModel;
