import type { Transaction, TransactionCreate, TransactionUpdate } from '@/interfaces/transaction';
import { api } from '@/lib/api';


export const transactionsApi = {
  getAll: async () => {
    const response = await api.get<{ data: Transaction[] }>('/transactions');
    return response.data.data;
  },

  getById: async (id: string) => {
    const response = await api.get<{ data: Transaction }>(`/transactions/${id}`);
    return response.data.data;
  },

  create: async (data: TransactionCreate) => {
    const response = await api.post<{ data: Transaction }>('/transactions', data);
    return response.data.data;
  },

  update: async (id: string, data: Partial<TransactionUpdate>) => {
    const response = await api.put<{ data: TransactionUpdate }>(`/transactions/${id}`, data);
    return response.data.data;
  },

  delete: async (id: string) => {
    await api.delete(`/transactions/${id}`);
  },
};
