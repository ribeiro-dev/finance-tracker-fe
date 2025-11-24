import type { Category } from "./category"

export interface Transaction {
  id: string
  title: string
  amount: number
  date: string
  description: string | null
  type: 'INCOME' | 'EXPENSE'
  // creator: User
  category: Category
  createdAt: string
  updatedAt: string
}

export interface TransactionCreate {
  title: string
  amount: number
  date: string
  description: string | null
  type: 'INCOME' | 'EXPENSE'
  categoryId: number
}

export interface TransactionUpdate {
  title: string
  amount: number
  date: string
  description: string | null
  type: 'INCOME' | 'EXPENSE'
  categoryId: number
}
