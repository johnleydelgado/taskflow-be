/* eslint-disable max-len */
import { Schema, model, Document } from 'mongoose';

export type TaskStatus = 'Pending' | 'Approved' | 'Rejected';

export interface ITask {
  title: string;
  description?: string;
  assignedTo: string[];        // array of email addresses
  status: TaskStatus;
  token: string;
  tokenExpires: Date;
  responded: boolean;
}

export type TaskDoc = ITask & Document;

const taskSchema = new Schema<TaskDoc>(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String },
    assignedTo:  { type: [String], required: true },   // store array of emails
    status:      { type: String, enum: ['Pending','Approved','Rejected'], default: 'Pending' },
    token:       { type: String, required: true, unique: true },
    tokenExpires:{ type: Date, required: true },
    responded:   { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const TaskModel = model<TaskDoc>('Task', taskSchema);
