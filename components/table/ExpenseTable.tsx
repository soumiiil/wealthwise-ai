import { Expense } from "@/types/expense";

type Props = {
  expenses: Expense[];
};

export default function ExpenseTable({ expenses }: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6 h-96 overflow-auto">

      <h2 className="text-xl font-semibold mb-6">
        Recent Expenses
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left py-3">Title</th>

            <th className="text-left">Category</th>

            <th className="text-right">Amount</th>

          </tr>

        </thead>

        <tbody>

          {expenses.map((expense) => (

            <tr key={expense.id} className="border-b">

              <td className="py-4">{expense.title}</td>

              <td>{expense.category}</td>

              <td className="text-right font-semibold">
                ₹{expense.amount}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}