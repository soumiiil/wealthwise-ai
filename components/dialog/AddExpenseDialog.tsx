"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AddExpenseDialog() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  async function handleSave() {
    if (!title || !amount || !category) return;

    const response = await fetch("/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        amount,
        category,
      }),
    });

    if (!response.ok) {
      alert("Failed to save expense");
      return;
    }

    setTitle("");
    setAmount("");
    setCategory("");

    alert("Expense Saved!");

    window.location.reload();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-blue-600 text-white px-5 py-3 rounded-xl">
          + Add Expense
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full border p-3 rounded-lg"
          />

          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="Amount"
            className="w-full border p-3 rounded-lg"
          />

          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            className="w-full border p-3 rounded-lg"
          />

          <button
            onClick={handleSave}
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            Save Expense
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}