# CollabTrack

CollabTrack is a collaborative project management platform. Teams organize work into projects, break work down into tasks and subtasks, track status, attach files, and keep project notes — all behind JWT authentication and role-based access control (admin / project admin / member).

## Repository Layout

This repository is structured as a monorepo, with each part of the product living in its own top-level directory:

- [`backend/`](./backend) — **Implemented.** The REST API (Node.js/Express, MongoDB) that powers the whole platform: auth, projects, tasks/subtasks, notes, and member management. See [`backend/README.md`](./backend/README.md) for full setup instructions, the complete API reference, the roles/permissions matrix, and data models.
- `frontend/` — **Not yet implemented.** A client application (planned) that will consume the backend API to give teams a UI for managing projects, tasks, and notes. Will be added as its own directory alongside `backend/` once work begins, with its own README covering setup and structure.

## Quick Start

Right now only the backend is available to run:

```bash
cd backend
npm install
npm run dev
```

See [`backend/README.md`](./backend/README.md) for environment variable configuration and the complete API documentation.

## Roadmap

- [x] Backend REST API — auth, projects, tasks/subtasks, notes, RBAC
- [ ] Frontend client — UI for the above, built against the existing backend API
- [ ] Deployment/infra docs, once both pieces exist
