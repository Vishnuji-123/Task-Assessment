# Task Management Application

A full-stack task management web application built for technical assessment. Features a clean, modern UI with complete CRUD operations, loading states, and error handling.

## 🚀 Live Demo

- **Preview URL**: [View Application](https://id-preview--a6058250-226c-45d4-b70c-7810114e7dab.lovable.app)

## 📋 Features

- ✅ **Create Tasks** - Add new tasks with title and optional description
- ✅ **View Tasks** - See all tasks in a clean card-based layout
- ✅ **Update Tasks** - Toggle status (Pending/Completed) and edit details
- ✅ **Delete Tasks** - Remove tasks with confirmation dialog
- ✅ **Filter Tasks** - Filter by All, Pending, or Completed status
- ✅ **Task Statistics** - Real-time count of total, pending, and completed tasks
- ✅ **Loading States** - Proper loading indicators for all operations
- ✅ **Error Handling** - User-friendly error messages and retry options
- ✅ **Input Validation** - Client-side validation with Zod schema
- ✅ **Responsive Design** - Works on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Component library
- **React Query** - Server state management
- **Zod** - Input validation
- **Lucide React** - Icon library

### Backend (Lovable Cloud)
- **PostgreSQL** - Database (via Supabase)
- **REST API** - Auto-generated from database schema
- **Row Level Security** - Public access policies (no auth required)

## 📁 Project Structure

```
src/
├── components/
│   ├── tasks/
│   │   ├── TaskForm.tsx      # Create task form
│   │   ├── TaskCard.tsx      # Individual task card
│   │   ├── TaskList.tsx      # Task list container
│   │   ├── TaskFilter.tsx    # Status filter buttons
│   │   └── TaskStats.tsx     # Statistics display
│   └── ui/                   # shadcn/ui components
├── hooks/
│   └── useTasks.ts           # Task CRUD hooks
├── types/
│   └── task.ts               # TypeScript interfaces
├── integrations/
│   └── supabase/
│       ├── client.ts         # Supabase client (auto-generated)
│       └── types.ts          # Database types (auto-generated)
├── pages/
│   ├── Index.tsx             # Main page
│   └── NotFound.tsx          # 404 page
└── App.tsx                   # Root component
```

## 🗄️ Database Schema

```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  status task_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Status enum: 'pending' | 'completed'
```

## 🔌 API Endpoints

The application uses Supabase's auto-generated REST API:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/rest/v1/tasks` | Fetch all tasks |
| POST | `/rest/v1/tasks` | Create a new task |
| PATCH | `/rest/v1/tasks?id=eq.{id}` | Update a task |
| DELETE | `/rest/v1/tasks?id=eq.{id}` | Delete a task |

## 🏃 Running Locally

### Prerequisites
- Node.js 18+ installed
- npm or bun package manager

### Steps

1. **Clone the repository**
   ```bash
   git clone <your-git-url>
   cd <project-name>
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🌐 Environment Variables

The following environment variables are automatically configured:

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Public API key |

> Note: These are auto-managed by Lovable Cloud and should not be modified manually.

## 🚀 Deployment

### Frontend
The application is deployed on Lovable's infrastructure and can be published via the Lovable interface.

### Backend
Database and API are hosted on Lovable Cloud (powered by Supabase) with automatic scaling.

## ⚠️ Assumptions & Limitations

1. **No Authentication** - Tasks are publicly accessible as specified in requirements
2. **Single User** - No multi-user support or task ownership
3. **No Offline Support** - Requires internet connection
4. **Browser Storage** - No local caching of tasks
5. **PostgreSQL Instead of MongoDB** - Lovable Cloud uses PostgreSQL, but provides equivalent functionality

## 📝 License

MIT License - Feel free to use this code for your projects.
