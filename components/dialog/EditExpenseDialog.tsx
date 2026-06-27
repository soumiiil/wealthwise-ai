"use client";

import { useEffect, useState } from "react";
import { Expense } from "@/types/expense";
import { Pencil } from "lucide-react";
import { CATEGORIES } from "@/constants/categories";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  expense: Expense;
  onExpenseUpdated: () => void;
};

export default function EditExpenseDialog({
  expense,
  onExpenseUpdated,
}: Props) {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(expense.amount.toString());
  const [category, setCategory] = useState(expense.category);

  useEffect(() => {
    if (open) {
      setTitle(expense.title);
      setAmount(expense.amount.toString());
      setCategory(expense.category);
    }
  }, [open, expense]);

  async function handleUpdate() {
    if (
      title.trim() === expense.title &&
      Number(amount) === expense.amount &&
      category.trim() === expense.category
    ) {
      setOpen(false);
      return;
    }

    const response = await fetch("/api/expenses", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: expense.id,
        title: title.trim(),
        amount,
        category: category.trim(),
      }),
    });

    if (!response.ok) {
      alert("Failed to update expense");
      return;
    }

    onExpenseUpdated();
    setOpen(false);
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (
      e.key === "Enter" &&
      title.trim() &&
      category.trim() &&
      Number(amount) > 0
    ) {
      handleUpdate();
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogTrigger asChild>
        <button className="text-blue-500 hover:text-blue-700 transition hover:scale-110">
          <Pencil size={18} />
        </button>
      </DialogTrigger>

      <DialogContent>

        <DialogHeader>
          <DialogTitle>Edit Expense</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Title"
            className="w-full border p-3 rounded-lg"
          />

          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyDown={handleKeyDown}
            type="number"
            placeholder="Amount"
            className="w-full border p-3 rounded-lg"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-3 rounded-lg"
          >
            <option value="">Select Category</option>

            {CATEGORIES.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>

          <button
            onClick={handleUpdate}
            disabled={
              !title.trim() ||
              !amount ||
              Number(amount) <= 0 ||
              !category.trim()
            }
            className={`w-full py-3 rounded-lg text-white transition ${
              !title.trim() ||
              !amount ||
              Number(amount) <= 0 ||
              !category.trim()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Update Expense
          </button>

        </div>

      </DialogContent>

    </Dialog>
  );
}