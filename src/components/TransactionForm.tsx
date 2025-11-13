import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { transactionsApi } from '@/services/transactions';
import { categoriesApi } from '@/services/categories';
import { toast } from 'sonner';
import type { Transaction, TransactionCreate, TransactionUpdate } from '@/interfaces/transaction';

const transactionSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(100),
  amount: z.coerce.number<number>().positive('Valor deve ser positivo'),
  description: z.string().max(200).nullable(),
  categoryId: z.string().min(1, 'Categoria é obrigatória'),
  type: z.enum(['INCOME', 'EXPENSE']),
  date: z.string().min(1, 'Data é obrigatório'),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

interface TransactionFormProps {
  transaction?: Transaction | null;
  onSuccess: () => void;
}

export const TransactionForm = ({ transaction, onSuccess }: TransactionFormProps) => {
  const queryClient = useQueryClient();

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesApi.getAll,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      title: transaction?.title ?? '',
      amount: transaction?.amount ?? 0,
      description: transaction?.description ?? null,
      categoryId: transaction?.category.id.toString() ?? '',
      type: transaction?.type ?? 'EXPENSE',
      date: transaction?.date.split('T')[0] ?? new Date().toISOString().split('T')[0],
    }
  });

  const createMutation = useMutation({
    mutationFn: transactionsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
      toast.success('Transação criada com sucesso');
      onSuccess();
    },
    onError: () => {
      toast.error('Falha ao criar transação');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TransactionUpdate> }) =>
      transactionsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
      toast.success('Transação atualizada com sucesso');
      onSuccess();
    },
    onError: () => {
      toast.error('Falha ao atualizar transação');
    },
  });

  const onSubmit = async (data: TransactionFormData) => {
    const formattedData = {
      ...data,
      categoryId: Number(data.categoryId)
    }
    console.log(data)

    if (transaction) {
      updateMutation.mutate({ id: transaction.id, data: formattedData });
    } else {
      createMutation.mutate(formattedData as TransactionCreate);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          placeholder="Uber"
          {...register('title')}
        />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Tipo</Label>
        <Select
          value={watch('type')}
          onValueChange={(value) => setValue('type', value as 'INCOME' | 'EXPENSE')}
        >
          <SelectTrigger className='text-secondary-foreground'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="INCOME">Renda</SelectItem>
            <SelectItem value="EXPENSE">Despesa</SelectItem>
          </SelectContent>
        </Select>
        {errors.type && <p className="text-sm text-destructive">{errors.type.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Valor</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          placeholder="0.01"
          {...register('amount')}
        />
        {errors.amount && <p className="text-sm text-destructive">{errors.amount.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Input
          id="description"
          placeholder="Ida ao show"
          {...register('description')}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Categoria</Label>
        <Select
          value={String(watch('categoryId'))}
          onValueChange={(value) => setValue('categoryId', value)}
        >
          <SelectTrigger className='text-secondary-foreground'>
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={String(category.id)}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.categoryId && (
          <p className="text-sm text-destructive">{errors.categoryId.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input id="date" type="date" {...register('date')} />
        {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={createMutation.isPending || updateMutation.isPending}>
        {transaction ? 'Editar Transaction' : 'Criar Transação'}
      </Button>
    </form>
  );
};
