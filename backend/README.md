# CollabTrack Backend

A REST API for collaborative project management — projects, hierarchical tasks/subtasks, notes, and team membership, secured with JWT authentication and role-based access control (RBAC).

## Features

- **Authentication:** registration with email verification, login/logout, JWT access + refresh tokens, forgot/reset password, resend verification email
- **Projects:** create, list, update, delete; per-project member management
- **Role-based access control:** three roles — `admin`, `project_admin`, `member` — enforced per project
- **Tasks & subtasks:** hierarchical task management with status tracking and file attachments
- **Notes:** project-level notes (admin-managed)
- **Health check** endpoint for monitoring

## Tech Stack

- **Runtime:** Node.js (ES modules)
- **Framework:** Express 5
- **Database:** MongoDB via Mongoose
- **Auth:** JWT (`jsonwebtoken`), password hashing with `bcrypt`
- **Validation:** `express-validator`
- **File uploads:** `multer`
- **Email:** `nodemailer` + `mailgen`
- **Dev tooling:** `nodemon`, `prettier`

## Project Structure

```
src/
├── app.js                  # Express app setup, middleware, route mounting
├── index.js                 # Entry point — loads env, connects DB, starts server
├── controllers/              # Request handlers (auth, project, task, note, healthcheck)
├── routes/                   # Route definitions per resource
├── models/                   # Mongoose schemas (user, project, projectmember, task, subtask, note)
├── middlewares/               # auth, error handling, multer (uploads), validation
├── validators/                # express-validator chains
├── utils/                     # ApiError, ApiResponse, asyncHandler, mail, constants
└── db/                        # MongoDB connection
public/images/                 # Uploaded file storage
```

## Getting Started

### Prerequisites

- Node.js
- A MongoDB instance (local or Atlas)
- SMTP credentials for transactional email (e.g. Mailtrap for development)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root (never commit this file):

| Variable | Description |
|---|---|
| `PORT` | Port the server listens on |
| `CORS_ORIGIN` | Allowed CORS origin(s), comma-separated |
| `MONGO_URI` | MongoDB connection string |
| `ACCESS_TOKEN_SECRET` | Secret for signing JWT access tokens |
| `ACCESS_TOKEN_EXPIRY` | Access token lifetime (e.g. `15m`) |
| `REFRESH_TOKEN_SECRET` | Secret for signing JWT refresh tokens |
| `REFRESH_TOKEN_EXPIRY` | Refresh token lifetime (e.g. `10d`) |
| `SERVER_URL` | Base URL of this server |
| `MAILTRAP_SMTP_HOST` / `_PORT` / `_USER` / `_PASS` | SMTP credentials for sending email |
| `FORGOT_PASSWORD_REDIRECT_URL` | Frontend URL the password-reset email links to |

### Running

```bash
npm run dev     # development, with nodemon
npm start        # production
```

## API Overview

Base path: `/api/v1`

### Auth — `/auth`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Register a new user |
| POST | `/login` | Log in |
| POST | `/logout` | Log out (secured) |
| GET | `/current-user` | Get current user (secured) |
| POST | `/change-password` | Change password (secured) |
| POST | `/refresh-token` | Refresh access token |
| GET | `/verify-email/:verificationToken` | Verify email |
| POST | `/forgot-password` | Request password reset |
| POST | `/reset-password/:resetToken` | Reset password |
| POST | `/resend-email-verification` | Resend verification email (secured) |

### Projects — `/projects`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/` | List user's projects | secured |
| POST | `/` | Create a project | secured |
| GET | `/:projectId` | Get project details | secured, role-based |
| PUT | `/:projectId` | Update project | admin |
| DELETE | `/:projectId` | Delete project | admin |
| GET | `/:projectId/members` | List project members | secured |
| POST | `/:projectId/members` | Add a member | admin |
| PUT | `/:projectId/members/:userId` | Update member role | admin |
| DELETE | `/:projectId/members/:userId` | Remove member | admin |

### Tasks — `/tasks`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/:projectId` | List tasks in project | secured, role-based |
| POST | `/:projectId` | Create task | admin / project_admin |
| GET | `/:projectId/t/:taskId` | Get task details | secured, role-based |
| PUT | `/:projectId/t/:taskId` | Update task | admin / project_admin |
| DELETE | `/:projectId/t/:taskId` | Delete task | admin / project_admin |
| POST | `/:projectId/t/:taskId/subtasks` | Create subtask | admin / project_admin |
| PUT | `/:projectId/st/:subTaskId` | Update subtask | secured, role-based |
| DELETE | `/:projectId/st/:subTaskId` | Delete subtask | admin / project_admin |

### Notes — `/notes`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/:projectId` | List project notes | secured, role-based |
| POST | `/:projectId` | Create note | admin |
| GET | `/:projectId/n/:noteId` | Get note details | secured, role-based |
| PUT | `/:projectId/n/:noteId` | Update note | admin |
| DELETE | `/:projectId/n/:noteId` | Delete note | admin |

### Health Check — `/healthcheck`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Returns API status |

## Roles & Permissions

Three roles, scoped per project via project membership:

| Feature | Admin | Project Admin | Member |
|---|---|---|---|
| Create/update/delete project | ✓ | ✗ | ✗ |
| Manage project members | ✓ | ✗ | ✗ |
| Create/update/delete tasks | ✓ | ✓ | ✗ |
| View tasks | ✓ | ✓ | ✓ |
| Create/delete subtasks | ✓ | ✓ | ✗ |
| Update subtask status | ✓ | ✓ | ✓ |
| Create/update/delete notes | ✓ | ✗ | ✗ |
| View notes | ✓ | ✓ | ✓ |

## Data Models

- **User** — `username`, `email`, `fullName`, `password` (hashed), `avatar`, `isEmailVerified`, refresh/verification/reset tokens
- **Project** — `name`, `description`, `createdBy`
- **ProjectMember** — links a `User` to a `Project` with a role
- **Task** — `title`, `description`, `project`, `assignedTo`, `assignedBy`, `status` (`Todo` / `in_progress` / `done`), `attachments`
- **Subtask** — linked to a parent `Task`, with completion status
- **Note** — project-scoped note content

## Security

- Passwords hashed with bcrypt before storage
- JWT access + refresh token pair, with refresh-token rotation endpoint
- Email verification and password-reset flows use hashed, time-limited tokens
- Centralized request validation via `express-validator`
- Centralized JSON error handling
- CORS restricted to configured origin(s)

## Notes

This project is under active development; see `PRD.md` for the full product requirements document.
