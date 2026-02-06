import { useState } from 'react';
import { format } from 'date-fns';
import { Check, Circle, Trash2, Loader2, Pencil, X, Save } from 'lucide-react';
import { z } from 'zod';
import { Task, TaskStatus } from '@/types/task';
import { useUpdateTask, useDeleteTask } from '@/hooks/useTasks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';

const taskSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  description: z.string().trim().max(1000, 'Description must be less than 1000 characters').optional(),
});

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});
  
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const handleStatusToggle = () => {
    const newStatus: TaskStatus = task.status === 'pending' ? 'completed' : 'pending';
    updateTask.mutate({ id: task.id, input: { status: newStatus } });
  };

  const handleSaveEdit = async () => {
    setErrors({});
    
    const result = taskSchema.safeParse({ title: editTitle, description: editDescription });
    
    if (!result.success) {
      const fieldErrors: { title?: string; description?: string } = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0] === 'title') fieldErrors.title = issue.message;
        if (issue.path[0] === 'description') fieldErrors.description = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      await updateTask.mutateAsync({
        id: task.id,
        input: {
          title: result.data.title,
          description: result.data.description || undefined,
        },
      });
      setIsEditing(false);
    } catch {
      // Error handled by mutation
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setErrors({});
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTask.mutate(task.id);
  };

  const isPending = updateTask.isPending || deleteTask.isPending;

  return (
    <Card className={cn(
      "group transition-all duration-200 hover:shadow-md animate-fade-in",
      task.status === 'completed' && "opacity-75"
    )}>
      <CardContent className="p-4">
        {isEditing ? (
          <div className="space-y-3">
            <div className="space-y-2">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="font-medium"
                disabled={isPending}
                autoFocus
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title}</p>
              )}
            </div>
            <div className="space-y-2">
              <Textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Add a description..."
                className="min-h-[60px] resize-none"
                disabled={isPending}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description}</p>
              )}
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancelEdit}
                disabled={isPending}
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSaveEdit}
                disabled={isPending || !editTitle.trim()}
              >
                {updateTask.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-1" />
                ) : (
                  <Save className="h-4 w-4 mr-1" />
                )}
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-3">
            <button
              onClick={handleStatusToggle}
              disabled={isPending}
              className={cn(
                "mt-0.5 flex-shrink-0 rounded-full p-0.5 transition-colors",
                "hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                task.status === 'completed' 
                  ? "text-success" 
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
            >
              {updateTask.isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : task.status === 'completed' ? (
                <Check className="h-5 w-5" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className={cn(
                    "font-medium leading-tight",
                    task.status === 'completed' && "line-through text-muted-foreground"
                  )}>
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className={cn(
                      "mt-1 text-sm text-muted-foreground line-clamp-2",
                      task.status === 'completed' && "line-through"
                    )}>
                      {task.description}
                    </p>
                  )}
                </div>

                <Badge
                  variant="outline"
                  className={cn(
                    "flex-shrink-0 text-xs font-medium",
                    task.status === 'pending' 
                      ? "task-status-pending" 
                      : "task-status-completed"
                  )}
                >
                  {task.status === 'pending' ? 'Pending' : 'Completed'}
                </Badge>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Created {format(new Date(task.created_at), 'MMM d, yyyy')}
                </p>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setIsEditing(true)}
                    disabled={isPending}
                    aria-label="Edit task"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        disabled={isPending}
                        aria-label="Delete task"
                      >
                        {deleteTask.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Task</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{task.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDelete}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
