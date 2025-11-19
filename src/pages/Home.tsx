import { format } from 'date-fns';
import { ArrowUpCircle, ArrowDownCircle, Wallet } from 'lucide-react';

import { useQuery } from '@tanstack/react-query';

import { reportsApi } from '@/services/reports';
import { transactionsApi } from '@/services/transactions';
import type { Transaction } from '@/interfaces/transaction';

import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


const Home = () => {
  const { data: summary } = useQuery({
    queryKey: ['summary'],
    queryFn: () => reportsApi.getSummary(),
  });

  const { data: transactions = [] } = useQuery({
    queryKey: ['transactions'],
    queryFn: transactionsApi.getAll,
  });

  const recentTransactions = transactions.slice(0, 5);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Painel</h1>
          <p className="text-muted-foreground">Bem vindo de volta! Aqui está sua visão geral financeira.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-0">
              <CardTitle className="text-md font-medium">Renda Total</CardTitle>
              <ArrowUpCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                R${summary?.income.toFixed(2) || '0.00'}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-0">
              <CardTitle className="text-md font-medium">Despesa Total</CardTitle>
              <ArrowDownCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                R${summary?.expenses.toFixed(2) || '0.00'}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-0">
              <CardTitle className="text-md font-medium">Saldo</CardTitle>
              <Wallet className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${(summary?.balance ?? 0) > 0 ? 'text-success' : 'text-destructive'}`}>
                R${summary?.balance.toFixed(2) || '0.00'}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Transações Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            {recentTransactions.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Sem transações criadas ainda
              </p>
            ) : (
              <div className="space-y-4">
                {recentTransactions.map((transaction: Transaction) => (
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
                    <div
                      className={`text-lg font-semibold ${
                        transaction.type === 'INCOME' ? 'text-success' : 'text-destructive'
                      }`}
                    >
                      R${transaction.amount.toFixed(2)}
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

export default Home;
