import { Task } from '@/types/task';
import { CheckCircle2, Clock, ListTodo } from 'lucide-react';

interface TaskStatsProps {
  tasks: Task[];
}

export function TaskStats({ tasks }: TaskStatsProps) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'completed').length;
  const pending = tasks.filter(t => t.status === 'pending').length;

  const stats = [
    {
      label: 'Total Tasks',
      value: total,
      icon: ListTodo,
      colorClass: 'text-primary bg-primary/10',
    },
    {
      label: 'Pending',
      value: pending,
      icon: Clock,
      colorClass: 'text-warning bg-warning/10',
    },
    {
      label: 'Completed',
      value: completed,
      icon: CheckCircle2,
      colorClass: 'text-success bg-success/10',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-3 rounded-lg border border-border/60 bg-card p-3"
        >
          <div className={`rounded-lg p-2 ${stat.colorClass}`}>
            <stat.icon className="h-4 w-4" />
          </div>
          <div>
            <p className="text-2xl font-semibold leading-none">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
