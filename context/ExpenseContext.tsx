"use client";

import { createContext, useContext, useState } from "react";
import { Expense } from "@/types/expense";
import { expenses as initialExpenses } from "@/data/expenses";

type ExpenseContextType = {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
};

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expenses, setExpenses] = useState(initialExpenses);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        setExpenses,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error("useExpenses must be used inside ExpenseProvider");
  }

  return context;
}