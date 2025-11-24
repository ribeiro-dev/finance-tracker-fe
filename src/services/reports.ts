import { api } from '@/lib/api';

import type { ReportsSummary } from '@/interfaces/reports';


export const reportsApi = {
  getSummary: async (startDate?: string, endDate?: string) => {
    const params = new URLSearchParams();
    if (startDate && endDate) {
      params.append('start_date', startDate)
      params.append('end_date', endDate);
    }

    const response = await api.get<{ data: ReportsSummary }>(`/reports/summary?${params}`);
    return response.data.data;
  },
};
