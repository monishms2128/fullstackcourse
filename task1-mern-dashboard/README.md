# MERN Task Management Dashboard

A full-stack task management app with JWT authentication, task CRUD, status columns (To Do / In Progress / Done), priority levels, due dates, and filtering.

## Tech Stack
- MongoDB + Mongoose
- Express.js
- React (Vite) + React Router
- JWT authentication

## Project Structure
```
task1-mern-dashboard/
├── server/     # Express + MongoDB API
└── client/     # React frontend (Vite)
```

## Setup

### Backend
```bash
cd server
npm install
cp .env.example .env   # fill in MONGO_URI and JWT_SECRET
npm run dev
```

### Frontend
```bash
cd client
npm install
cp .env.example .env   # set VITE_API_URL if backend isn't on localhost:5000
npm run dev
```

## Features
- Register / login with JWT
- Create, edit, delete tasks
- Status board: To Do → In Progress → Done
- Priority (low/medium/high) with color-coded cards
- Due dates
- Filter tasks by priority

## API Endpoints
| Method | Route              | Description        |
|--------|--------------------|--------------------|
| POST   | /api/auth/register | Register new user  |
| POST   | /api/auth/login    | Log in             |
| GET    | /api/tasks         | Get user's tasks   |
| POST   | /api/tasks         | Create task        |
| PUT    | /api/tasks/:id     | Update task        |
| DELETE | /api/tasks/:id     | Delete task        |
