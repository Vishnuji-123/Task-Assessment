import { useState, useMemo } from 'react';
import { Loader2, AlertCircle, CheckSquare } from 'lucide-react';
import { useTasks } from '@/hooks/useTasks';
import { TaskForm } from '@/components/tasks/TaskForm';
import { TaskList } from '@/components/tasks/TaskList';
import { TaskStats } from '@/components/tasks/TaskStats';
import { TaskFilter } from '@/components/tasks/TaskFilter';
import { TaskStatus } from '@/types/task';
import { Button } from '@/components/ui/button';

type FilterOption = 'all' | TaskStatus;

export default function Index() {
  const { data: tasks, isLoading, error, refetch } = useTasks();
  const [filter, setFilter] = useState<FilterOption>('all');

  const filteredTasks = useMemo(() => {
    if (!tasks) return [];
    if (filter === 'all') return tasks;
    return tasks.filter(task => task.status === filter);
  }, [tasks, filter]);

  const counts = useMemo(() => ({
    all: tasks?.length ?? 0,
    pending: tasks?.filter(t => t.status === 'pending').length ?? 0,
    completed: tasks?.filter(t => t.status === 'completed').length ?? 0,
  }), [tasks]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/60 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground">
            <CheckSquare className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Task Manager</h1>
            <p className="text-sm text-muted-foreground">Organize your work efficiently</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Stats */}
        {tasks && tasks.length > 0 && (
          <TaskStats tasks={tasks} />
        )}

        {/* Task Form */}
        <section>
          <TaskForm />
        </section>

        {/* Filter & List */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-3 text-sm text-muted-foreground">Loading tasks...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-destructive/10 p-4 mb-4">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <h3 className="text-lg font-medium text-foreground">Failed to load tasks</h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-sm">
              {error.message}
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => refetch()}
            >
              Try again
            </Button>
          </div>
        ) : (
          <section className="space-y-4">
            {tasks && tasks.length > 0 && (
              <div className="flex items-center justify-between">
                <TaskFilter
                  currentFilter={filter}
                  onFilterChange={setFilter}
                  counts={counts}
                />
              </div>
            )}
            <TaskList tasks={filteredTasks} />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/60 mt-auto">
        <div className="max-w-3xl mx-auto px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            Task Management App • Built with React & Lovable Cloud
          </p>
        </div>
      </footer>
    </div>
  );
}
