 
/* eslint-disable max-len */
 
 
import { TaskDoc, TaskModel } from '@src/models/Tasks';
import { v4 as uuid } from 'uuid';

export async function createTask(data: {
  title: string,
  description?: string,
  assigneeEmails: string[],   
}): Promise<TaskDoc> {
  const token = uuid();  
  const expires = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);  // 1 day

  const doc = await TaskModel.create({
    title:        data.title,
    description:  data.description,
    assignedTo:   data.assigneeEmails,  
    status:       'Pending',
    token,
    tokenExpires: expires,
    responded:    false,
  });

  return doc; 
}

export async function getAllTasks(): Promise<TaskDoc[]> {
  return TaskModel.find().exec();
}


export async function findTaskByToken(token: string) {
  return TaskModel.findOne({
    token,
    // responded: false,
    tokenExpires: { $gt: new Date() },
  }).exec();
}

/**
 * Mark a task approved or rejected.
 */
export async function respondToTask(token: string, approve: boolean) {
  const task = await findTaskByToken(token);
  if (!task) throw new Error('Invalid or expired token');

  task.status = approve ? 'Approved' : 'Rejected';
  task.responded = true;
  await task.save();
  return task;
}

/** === NEW: Edit a task by its ID === */
export async function updateTask(
  id: string,
  data: {
    title?: string,
    description?: string,
    assigneeEmails?: string[],
  },
): Promise<TaskDoc|null> {
  // Only include the fields actually passed
  const updatePayload: Partial<Pick<TaskDoc, 'title' | 'description' | 'assignedTo'>> = {};
  if (data.title !== undefined)         updatePayload.title = data.title;
  if (data.description !== undefined)   updatePayload.description = data.description;
  if (data.assigneeEmails !== undefined) updatePayload.assignedTo = data.assigneeEmails;

  // { new: true } returns the updated document
  return TaskModel.findByIdAndUpdate(id, updatePayload, { new: true }).exec();
}

/** === NEW: Delete a task by its ID === */
export async function deleteTask(id: string): Promise<void> {
  await TaskModel.findByIdAndDelete(id).exec();
}

/**
 * Returns true if token corresponds to a task that:
 *   • exists
 *   • has not been responded to
 *   • is not expired
 */
export async function isTokenValid(token: string): Promise<boolean> {
  const task = await TaskModel.findOne({
    token,
    // responded: false,
    tokenExpires: { $gt: new Date() },
  }).exec();
  return task !== null;
}


export async function getTaskStatusByToken(
  token: string,
): Promise<'pending' | 'approved' | 'rejected' | null> {
  const task = await TaskModel.findOne({ token }).exec();
  if (!task) return null;
  if (!task.responded) return 'pending';
  return task.status === 'Approved' ? 'approved' : 'rejected';
}