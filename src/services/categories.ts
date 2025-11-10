import type { Category, CategoryCreate, CategoryUpdate } from '@/interfaces/category';
import { api } from '@/lib/api';



export const categoriesApi = {
  getAll: async () => {
    const response = await api.get<{ data: Category[] }>('/categories');
    return response.data.data;
  },

  create: async (data: CategoryCreate) => {
    const response = await api.post<{ data: CategoryCreate }>('/categories', data);
    return response.data.data;
  },

  update: async (id: string, data: CategoryUpdate) => {
    const response = await api.put<{ data: CategoryUpdate }>(`/categories/${id}`, data);
    return response.data.data;
  },

  delete: async (id: string) => {
    await api.delete(`/categories/${id}`);
  },
};
