import { TaskStatus } from '@/types/task';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type FilterOption = 'all' | TaskStatus;

interface TaskFilterProps {
  currentFilter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
  counts: {
    all: number;
    pending: number;
    completed: number;
  };
}

export function TaskFilter({ currentFilter, onFilterChange, counts }: TaskFilterProps) {
  const filters: { value: FilterOption; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: counts.all },
    { value: 'pending', label: 'Pending', count: counts.pending },
    { value: 'completed', label: 'Completed', count: counts.completed },
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant="ghost"
          size="sm"
          onClick={() => onFilterChange(filter.value)}
          className={cn(
            "h-8 px-3 text-sm font-medium transition-all",
            currentFilter === filter.value
              ? "bg-background shadow-sm text-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-transparent"
          )}
        >
          {filter.label}
          <span className={cn(
            "ml-1.5 text-xs",
            currentFilter === filter.value 
              ? "text-muted-foreground" 
              : "text-muted-foreground/60"
          )}>
            {filter.count}
          </span>
        </Button>
      ))}
    </div>
  );
}
