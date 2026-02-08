# Task Management Application

A full-stack task management web application built as part of a technical assessment.  
The application demonstrates end-to-end functionality, clean UI, CRUD operations, and deployment readiness.

---

## 🚀 Live Application

**Live URL:**  
[https://task-management-app](https://task-assessment-theta.vercel.app/)

The deployed version is fully functional and publicly accessible.

---

## 📌 Features

- Create tasks with title and optional description
- View all tasks in a clean, responsive interface
- Update task status (Pending / Completed)
- Edit task details
- Delete tasks
- Filter tasks by status
- Real-time task statistics
- Loading states for async operations
- User-friendly error handling
- Responsive design (desktop & mobile)

---

## 🛠️ Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Query
- Zod (input validation)

### Backend
- PostgreSQL (via Supabase)
- Auto-generated REST APIs
- Backend-as-a-Service architecture

---

## 🏗️ Architecture Overview

The application follows a client–API–database architecture:

- The **frontend** is a React single-page application.
- The **backend layer** is implemented using Supabase, which provides:
  - A managed PostgreSQL database
  - RESTful APIs for CRUD operations
  - Server-side data persistence

This approach replaces a traditional custom Express server while still supporting full end-to-end functionality and backend operations.

---
