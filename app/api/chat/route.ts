import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const expenses = await prisma.expense.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(expenses);
}

export async function POST(request: Request) {
  const body = await request.json();

  const expense = await prisma.expense.create({
    data: {
      title: body.title,
      amount: Number(body.amount),
      category: body.category,
      date: new Date(),
    },
  });

  return NextResponse.json(expense);
}