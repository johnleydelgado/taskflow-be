# Task Flow Backend

A lightweight Node.js & TypeScript backend for the Link-Based Task Approval App technical assessment. This Express server implements the API routes, email workflows, and token-management required for a manager to create tasks, send approval emails, and process user responses via secure, single-use links.

---

## Project Details

- **Name:** TaskFlow
- **Version:** 0.0.0  
- **Description:** API server for task creation, assignment, tokenized link generation, email delivery, and response handling.

## Tech Stack

- **Runtime:** Node.js (>=16.0.0)  
- **Language:** TypeScript  
- **Framework:** Express.js  
- **Database:** MongoDB via Mongoose  
- **Authentication & Security:** JSON Web Tokens (jsonwebtoken), bcrypt (password hashing), helmet, cors  
- **Email Service:** nodemailer  
- **Utilities:** dotenv, dayjs, uuid, express-async-errors  
- **Logging & Validation:** jet-logger, jet-validators, morgan, module-alias

## Prerequisites

- **Node.js** v16+  
- **npm** (bundled with Node.js)  
- **MongoDB** instance (local or hosted)

## Installation

```bash
git clone https://github.com/johnleydelgado/taskflow-be.git
cd taskflow-be
npm install
```

## Environment Variables

> You will receive a `.env` file containing all necessary configuration values (database URI, JWT secret, email credentials, etc.).  
> Place it in the project root before running any scripts.

Example `.env` contents:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=your_jwt_secret
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
```

## Postman Collection

> A Postman collection (`Task Flow API.postman_collection.json`) will be provided.  
> Import it to explore and test all available endpoints (task CRUD, email send, token response, authentication, etc.).

## Available Scripts

- **`npm run dev`**  
  Launch the server in development mode (`NODE_ENV=development`) using `ts-node`.

- **`npm run dev:hot`**  
  Same as `dev` but with `nodemon` for hot-reloading on code changes.

- **`npm run build`**  
  Compile TypeScript sources to JavaScript under `./dist` using the custom build script.

- **`npm run start`**  
  Run the compiled server in production mode (`NODE_ENV=production`).

- **`npm run test`**  
  Execute Jasmine tests (`NODE_ENV=test`) with `ts-node`.

- **`npm run test:hot`**  
  Watch and re-run tests on file changes via `nodemon`.

- **`npm run lint`**  
  Run ESLint for code quality.

- **`npm run type-check`**  
  Run the TypeScript compiler (`tsc --noEmit`) to check types.

- **`npm run clean-install`**  
  Clear `node_modules` and reinstall dependencies from scratch.

## API Endpoints

All routes are prefixed with `/api`.

### User Routes (Protected)
- **GET** `/api/users/all` — Fetch all users.
- **POST** `/api/users/add` — Create a new user.
- **PUT** `/api/users/update/:id` — Update an existing user.
- **DELETE** `/api/users/delete/:id` — Delete a user.
- **POST** `/api/users/login` — Authenticate and receive a JWT (sets an HTTP‑only cookie).

### Task Routes (Protected)
- **POST** `/api/tasks/email-creation` — Create a task and send approval emails.
- **GET** `/api/tasks/all` — List all tasks with their statuses.
- **PUT** `/api/tasks/update/:id` — Update task details.
- **DELETE** `/api/tasks/delete/:id` — Delete a task.
- **PUT** `/api/tasks/task-respond/:token` — Approve or reject a task (request body: `{ token, action }`).
- **GET** `/api/tasks/token-valid/:token` — Check if a task token is valid.
- **GET** `/api/tasks/status/:token` — Get the current status (`pending`/`approved`/`rejected`) of a task by token.
- **GET** `/api/tasks/:token` — Fetch detailed task data by token.

## Security Considerations

- All tokens are single-use and expire after first use or a configurable time window (via `dayjs`).  
- Passwords (if applicable) are hashed with `bcrypt` before storage.  
- CORS and HTTP headers are hardened with `cors` and `helmet`.

## License

MIT © Johnley Delgado

