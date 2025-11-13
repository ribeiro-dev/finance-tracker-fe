import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Layout } from '@/components/Layout';
import { TransactionForm } from '@/components/TransactionForm';

import { transactionsApi } from '@/services/transactions';
import type { Transaction } from '@/interfaces/transaction';

const Transactions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const queryClient = useQueryClient();

  const { data: transactions = [] } = useQuery({
    queryKey: ['transactions'],
    queryFn: transactionsApi.getAll,
  });

  const deleteMutation = useMutation({
    mutationFn: transactionsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
      toast.success('Transação deletada com sucesso!');
    },
    onError: () => {
      toast.error('Falha ao deletar transação');
    },
  });


  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    toast.warning('Tem certeza que deseja deletar a transação?', {
      action: {
        label: 'Confirmar',
        onClick: () => deleteMutation.mutate(id),
      },
      classNames: {
        actionButton: '!bg-[#dc7609]' // button was black
      },
    })
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditingTransaction(null);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Transações</h1>
            <p className="text-muted-foreground">Gerencie suas rendas e despesas</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingTransaction(null)}>
                <Plus className="mr-2 h-4 w-4" />
                Criar Transação
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md" aria-description='Formulário de Criação/Edição de Transação'>
              <DialogHeader>
                <DialogTitle>
                  {editingTransaction ? 'Editar Transação' : 'Nova Transação'}
                </DialogTitle>
              </DialogHeader>
              <TransactionForm
                transaction={editingTransaction}
                onSuccess={handleClose}
              />
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent>
            {transactions.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-muted-foreground mb-4">
                  Sem transactions ainda. Crie a primeira e vamos começar!
                </p>
                <Button onClick={() => setIsOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Crie Sua Primeira Transação
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {transactions.map((transaction: Transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{transaction.title}</p>
                      <p className="text-muted-foreground">{transaction.description}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{transaction.category.name}</span>
                        <span>•</span>
                        <span>{format(new Date(transaction.date), 'dd-MM-yyyy')}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div
                        className={`text-lg font-semibold ${
                          transaction.type === 'INCOME' ? 'text-success' : 'text-destructive'
                        }`}
                      >
                        R${transaction.amount.toFixed(2)}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(transaction)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(transaction.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Transactions;
