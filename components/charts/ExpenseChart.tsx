"use client";

import { Expense } from "@/types/expense";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

type Props = {
  expenses: Expense[];
};

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
];

export default function ExpenseChart({ expenses }: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6 h-96">

      <h2 className="text-xl font-semibold mb-6">
        Expense Breakdown
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <PieChart>

          <Pie
            data={expenses}
            dataKey="amount"
            nameKey="category"
            outerRadius={100}
            label
          >
            {expenses.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}