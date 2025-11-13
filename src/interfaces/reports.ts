export interface ReportsSummary {
  income: number;
  expenses: number;
  balance: number;
  period: {
    start: string,
    end: string
  };
}
