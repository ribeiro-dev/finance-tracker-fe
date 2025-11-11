import type { Transaction } from '@/interfaces/transaction';
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

  delete: async (id: string) => {
    await api.delete(`/transactions/${id}`);
  },
};
