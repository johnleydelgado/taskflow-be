
export default {
  Base: '/api',
  Users: {
    Base: '/users',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
    Login: '/login',
    Logout: '/logout',
  },
  Tasks: {
    Base: '/tasks',
    Get: '/all',
    Add: '/add',
    Update: '/update/:id',
    Delete: '/delete/:id',
    EmailCreation: '/email-creation',
    TokenValidation: '/token-valid/:token',
    TaskStatus: '/status/:token',
    TaskRespond: '/task-respond/:token',
    GetTaskByToken: '/:token',
  },
} as const;
