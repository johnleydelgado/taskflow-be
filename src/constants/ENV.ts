/* eslint-disable n/no-process-env */
import 'dotenv/config';

import { NodeEnvs } from '.';

const ENV = {
  NodeEnv:    process.env.NODE_ENV as NodeEnvs,
  Port:       Number(process.env.PORT ?? 3000),
  MongoUri:   process.env.MONGO_URI!,
  MongoDbName:process.env.MONGO_DB_NAME!,
  // Email (for Nodemailer)
  EmailHost:   process.env.EMAIL_HOST!,
  EmailPort:   Number(process.env.EMAIL_PORT ?? 587),
  EmailSecure: process.env.EMAIL_SECURE === 'true',
  EmailUser:   process.env.EMAIL_USER!,
  EmailPass:   process.env.EMAIL_PASS!,
  EmailFrom:   process.env.EMAIL_FROM!,
  // Email (for Nodemailer)
  JwtSecret:   process.env.JWT_SECRET!,
  JwtExpiresIn:process.env.JWT_EXPIRES_IN!,
  AppUrl:   process.env.APP_URL!,
};

export default ENV;
