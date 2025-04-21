 
/* eslint-disable max-len */
// src/routes/TaskRoutesHandlers.ts
import { Request, Response, NextFunction } from 'express';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import {
  createTask,
  getAllTasks,
  respondToTask,
  updateTask,
  deleteTask,
  isTokenValid,
  getTaskStatusByToken,
  findTaskByToken,
} from './services/TaskService';
import { sendEmail } from '@src/util/mailer';
import { taskApprovalTemplate } from '@src/util/emailTemplates';
import ENV from '@src/constants/ENV';

/**
 * POST /api/tasks/
 * Create a task and email approval links
 */
export async function createAndEmail(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { title, description, assigneeEmails } = req.body as {
      title: string,
      description?: string,
      assigneeEmails: string[],
    };

    // 1) Create the task
    const task = await createTask({ title, description, assigneeEmails });

    // 2) Email each assignee
    for (const email of assigneeEmails) {
      const link = `${ENV.AppUrl}/approval/${task.token}`;
      await sendEmail({
        to:      email,
        subject: `Task Approval Request: ${title}`,
        html:    taskApprovalTemplate({ taskTitle: title, link }),
      });
    }

    // 3) Return created task
    res.status(HttpStatusCodes.CREATED).json(task);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/tasks/respond?token=XYZ&action=approve|reject
 * Handle approval or rejection via token
 */
export async function respond(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { token,action } = req.body as {
      token: string,
      action: string,
    };
    const approve = action=== 'approve';
    const task = await respondToTask(token, approve);
    res.status(HttpStatusCodes.OK).json(task);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/tasks/
 * List all tasks
 */
export async function getAllTasksData(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const tasks = await getAllTasks();
    res.status(HttpStatusCodes.OK).json({ tasks });
  } catch (err) {
    next(err);
  }
}

/**
 * PUT /api/tasks/:id
 * Update task fields
 */
// export async function updateTaskData(
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) {
//   try {
//     const { id } = req.params;
//     const { title, description, assigneeEmails } = req.body as {
//       title?: string,
//       description?: string,
//       assigneeEmails?: string[],
//     };
//     const updated = await updateTask(id, { title, description, assigneeEmails });
//     if (!updated) {
//       return res.status(HttpStatusCodes.NOT_FOUND).json({ error: 'Task not found' });
//     }
//     res.status(HttpStatusCodes.OK).json(updated);
//   } catch (err) {
//     next(err);
//   }
// }


export async function updateTaskData(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params.id;
    const { title, description, assigneeEmails } = req.body as {
      title?: string,
      description?: string,
      assigneeEmails?: string[],
    };

    const updated = await updateTask(id, { title, description, assigneeEmails });
    if (!updated) {
      res.status(HttpStatusCodes.NOT_FOUND).json({ error: 'Task not found' });
    }
    res.status(HttpStatusCodes.OK).json(updated);
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /api/tasks/:id
 * Remove a task
 */
export async function deleteTaskData(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    await deleteTask(id);
    res.sendStatus(HttpStatusCodes.NO_CONTENT);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/tasks/token-valid/:token/
 * Check if a token is valid
 */
export function checkTokenValidity(req: Request, res: Response, next: NextFunction): void {
  (async () => {
    try {
      const token = String(req.params.token);
      const valid = await isTokenValid(token);
      return res.status(HttpStatusCodes.OK).json({ valid });
    } catch (error) {
      next(error);
    }
  })();
}

/**
 * GET /api/tasks/status/:token
 * Get the status of a task by its token
 */
export function fetchTaskStatus(req: Request, res: Response, next: NextFunction): void {
  (async () => {
    try {
      const token = String(req.params.token);
      const status = await getTaskStatusByToken(token);
      if (status === null) {
        return res
          .status(HttpStatusCodes.NOT_FOUND)
          .json({ error: 'Task not found' });
      }
      return res.status(HttpStatusCodes.OK).json({ status });
    } catch (err) {
      next(err);
    }
  })();
}

/**
 * GET /api/tasks/:token
 * Fetch a task by its token
 */
export function fetchTaskByToken(req: Request, res: Response, next: NextFunction): void {
  (async () => {
    try {
      const token = String(req.params.token);
      const task = await findTaskByToken(token);
      if (task === null) {
        return res
          .status(HttpStatusCodes.NOT_FOUND)
          .json({ error: 'Task not found' });
      }
      return res.status(HttpStatusCodes.OK).json({ task });
    } catch (err) {
      next(err);
    }
  })();
}