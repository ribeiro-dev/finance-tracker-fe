import type { Category } from "./category"

export interface Transaction {
  id: string
  title: string
  amount: number
  date: Date
  description: string | null
  type: 'INCOME' | 'EXPENSE'
  // creator: User
  category: Category
  createdAt: Date
  updatedAt: Date
}
