/* eslint-disable max-len */
import { Router } from 'express';

import UserRoutes from './UserRoutes';
import { checkTokenValidity, createAndEmail, deleteTaskData, fetchTaskStatus, getAllTasksData, updateTaskData  , respond, fetchTaskByToken } from './TaskRoutesHandlers';
import { staticTokenAuth } from '@src/middleware/staticTokenAuth';
import Paths from '@src/constants/Paths';


/******************************************************************************
                                Setup
******************************************************************************/

const apiRouter = Router();


// ** Add UserRouter ** //

// Init router
const userRouter = Router();
const taskRouter = Router();
taskRouter.use(staticTokenAuth);
userRouter.use(staticTokenAuth);
// Get all users
userRouter.get(Paths.Users.Get, UserRoutes.getAll);
userRouter.post(Paths.Users.Add, UserRoutes.add);
userRouter.put(Paths.Users.Update, UserRoutes.update);
userRouter.delete(Paths.Users.Delete, UserRoutes.delete);
userRouter.post(Paths.Users.Login,  UserRoutes.login);

taskRouter.post(Paths.Tasks.EmailCreation, createAndEmail);
taskRouter.get(Paths.Tasks.Get, getAllTasksData);
taskRouter.put(Paths.Tasks.Update, updateTaskData);
taskRouter.put(Paths.Tasks.TaskRespond, respond);
taskRouter.delete(Paths.Tasks.Delete, deleteTaskData);
// new endpoints, by token:
taskRouter.get(Paths.Tasks.TokenValidation,checkTokenValidity);
taskRouter.get(Paths.Tasks.TaskStatus,fetchTaskStatus);
taskRouter.get(Paths.Tasks.GetTaskByToken,fetchTaskByToken);

// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);
apiRouter.use(Paths.Tasks.Base, taskRouter);



/******************************************************************************
                                Export default
******************************************************************************/

export default apiRouter;
