import { Task } from '@/types/task';
import { TaskCard } from './TaskCard';
import { ClipboardList } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <ClipboardList className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground">No tasks yet</h3>
        <p className="mt-1 text-sm text-muted-foreground max-w-sm">
          Create your first task using the form above to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task, index) => (
        <div key={task.id} style={{ animationDelay: `${index * 50}ms` }}>
          <TaskCard task={task} />
        </div>
      ))}
    </div>
  );
}
