import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ editExpense, sort, setSort, expenses, deleteExpense }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-2">

                <h2 className="text-lg font-bold">
                    Recent Expenses
                </h2>

                <select value={sort} onChange={(e) => setSort(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none">
                    <option>Newest</option>
                    <option>Oldest</option>
                    <option>Highest Amount</option>
                    <option>Lowest Amount</option>
                </select>

            </div>


            {/* Expenses */}
            <div>
                {expenses.length === 0 ? (
                    <p className="text-gray-400 text-center py-8 text-sm">
                        No expenses found. Add one to get started!
                    </p>
                ) : (
                expenses.map((expense) => (
                    <ExpenseItem
                        key={expense.id}
                        expense={expense}
                        deleteExpense={deleteExpense}
                        editExpense={editExpense}
                    />
                ))
                )}
            </div>

        </div>
    );
};

export default ExpenseList;