"use client";

import { useState } from "react";
import { expenses as initialExpenses } from "@/data/expenses";

import {
  Wallet,
  PiggyBank,
  ArrowUpCircle,
} from "lucide-react";

import StatCard from "../cards/StatCard";
import ExpenseChart from "../charts/ExpenseChart";
import ExpenseTable from "../table/ExpenseTable";
import AIInsights from "../ai/AIInsights";
import AddExpenseDialog from "../dialog/AddExpenseDialog";

export default function Dashboard() {

  const [expenses, setExpenses] = useState(initialExpenses);

  const totalExpenses = expenses.reduce(
  (sum, expense) => sum + expense.amount,
  0
);

const monthlyBudget = 15000;

const savingsScore = Math.round(
  ((monthlyBudget - totalExpenses) / monthlyBudget) * 100
);

  return (
    <div className="max-w-7xl mx-auto">

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-4xl font-bold">
            WealthWise AI
          </h1>

          <p className="text-gray-500 mt-2">
            AI Powered Personal Finance Dashboard
          </p>
        </div>

        <AddExpenseDialog
  expenses={expenses}
  setExpenses={setExpenses}
/>

      </div>

      <div className="grid grid-cols-3 gap-6 mt-10">

        <StatCard
          title="Total Expenses"
          value={`₹${totalExpenses}`}
          icon={<Wallet size={28} />}
          color="bg-blue-500"
        />

        <StatCard
          title="Monthly Budget"
          value="₹15,000"
          icon={<PiggyBank size={28} />}
          color="bg-green-500"
        />

        <StatCard
          title="Savings Score"
          value={`${savingsScore}%`}
          icon={<ArrowUpCircle size={28} />}
          color="bg-purple-500"
        />

      </div>

      <div className="grid grid-cols-2 gap-6 mt-8">

        <ExpenseChart expenses={expenses} />

        <ExpenseTable expenses={expenses} />

      </div>

      <div className="mt-8">

        <AIInsights />

      </div>

    </div>
  );
}