import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';
import cors from 'cors';
import 'express-async-errors';



import { errorHandler } from './util/errorHandler';
import ENV from './constants/ENV';
import { NodeEnvs } from './constants';
import Paths from './constants/Paths';
import HttpStatusCodes from './constants/HttpStatusCodes';
import { RouteError } from './util/route-errors';
import BaseRouter from './routes/index';

/******************************************************************************
                                Setup
******************************************************************************/

const app = express();

// allow your frontend origin (adjust port/origin as needed)
const corsOptions = {
  origin: ENV.NodeEnv === NodeEnvs.Dev
    ? 'http://localhost:5173'      // where your React app runs
    : ['https://task-approver-api.onrender.com','https://taskflow-d6mdfamqh-leydelgados-projects.vercel.app' , 'https://taskflow-hmwcq4ad9-leydelgados-projects.vercel.app'],
  credentials: true,               // allow cookies/Authorization headers
};
app.use(cors(corsOptions));

// **** Middleware **** //

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Show routes called in console during development
if (ENV.NodeEnv === NodeEnvs.Dev) {
  app.use(morgan('dev'));
}

// Security
if (ENV.NodeEnv === NodeEnvs.Production) {
  // eslint-disable-next-line n/no-process-env
  if (!process.env.DISABLE_HELMET) {
    app.use(helmet());
  }
}

// Add APIs, must be after middleware
app.use(Paths.Base, BaseRouter);
app.use(errorHandler);
// Add error handler
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  if (ENV.NodeEnv !== NodeEnvs.Test.valueOf()) {
    logger.err(err, true);
  }
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
    res.status(status).json({ error: err.message });
  }
  return next(err);
});


// **** FrontEnd Content **** //

// Set views directory (html)
// const viewsDir = path.join(__dirname, 'views');
// app.set('views', viewsDir);

// Set static directory (js and css).
// const staticDir = path.join(__dirname, 'public');
// app.use(express.static(staticDir));

// Nav to users pg by default
app.get('/', (_: Request, res: Response) => {
  return res.redirect('/users');
});

// Redirect to login if not logged in.
// app.get('/users', (_: Request, res: Response) => {
//   return res.sendFile('users.html', { root: viewsDir });
// });


/******************************************************************************
                                Export default
******************************************************************************/

export default app;
