import mongoose, { Schema, model } from 'mongoose';
import { ProjectInterface } from '../interfaces/ProjectInterface';

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['Not Started', 'In Progress', 'Completed'],
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
    },
  },
  {
    versionKey: false,
  }
);

const ProjectModel = model<ProjectInterface>('Project', ProjectSchema);

export default ProjectModel;
