# Task Manager - MERN Stack

A full-stack task management application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring JWT authentication and complete CRUD operations.

## Tech Stack

- **Frontend:** React, React Router, Bootstrap, Axios, React Hot Toast
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs
- **Database:** MongoDB Atlas

## Features

- User registration and login with JWT authentication
- Protected routes and authorization (users access only their own tasks)
- Create, read, update, and delete tasks
- Mark tasks as completed / pending
- Toggle completion status
- Bulk delete completed tasks
- Filter tasks by status, priority
- Search tasks by title or description
- Sort tasks by newest, oldest, priority, due date
- Task statistics dashboard (total, completed, pending, overdue)
- Responsive Bootstrap UI with modals and toast notifications

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the repository

```bash
git clone https://github.com/SahirAli7/task-manager-mern.git
cd task-manager-mern
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:

```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

Run the server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

The frontend will run on `http://localhost:5173` and proxy API requests to `http://localhost:5000`.

## API Documentation

### Auth Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get logged-in user | Yes |

### Task Endpoints (all require Bearer token)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks` | Get user's tasks (query: `status`, `search`, `sort`, `priority`) |
| GET | `/api/tasks/stats` | Get task statistics |
| GET | `/api/tasks/:id` | Get a single task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |
| DELETE | `/api/tasks/completed` | Delete all completed tasks |
| PATCH | `/api/tasks/:id/toggle` | Toggle task completion |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `PORT` | Server port (default: 5000) |
| `VITE_API_URL` | API URL for production (optional, defaults to `http://localhost:5000/api`) |
