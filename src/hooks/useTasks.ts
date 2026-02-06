import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Task, CreateTaskInput, UpdateTaskInput } from '@/types/task';
import { toast } from 'sonner';

const TASKS_QUERY_KEY = ['tasks'];

export function useTasks() {
  return useQuery({
    queryKey: TASKS_QUERY_KEY,
    queryFn: async (): Promise<Task[]> => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data as Task[];
    },
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateTaskInput): Promise<Task> => {
      const { data, error } = await supabase
        .from('tasks')
        .insert({
          title: input.title.trim(),
          description: input.description?.trim() || null,
          status: input.status || 'pending',
        })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data as Task;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
      toast.success('Task created successfully');
    },
    onError: (error) => {
      toast.error(`Failed to create task: ${error.message}`);
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, input }: { id: string; input: UpdateTaskInput }): Promise<Task> => {
      const updateData: Record<string, unknown> = {};
      
      if (input.title !== undefined) updateData.title = input.title.trim();
      if (input.description !== undefined) updateData.description = input.description?.trim() || null;
      if (input.status !== undefined) updateData.status = input.status;

      const { data, error } = await supabase
        .from('tasks')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data as Task;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
      toast.success('Task updated successfully');
    },
    onError: (error) => {
      toast.error(`Failed to update task: ${error.message}`);
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
      toast.success('Task deleted successfully');
    },
    onError: (error) => {
      toast.error(`Failed to delete task: ${error.message}`);
    },
  });
}
