const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const ExpenseChart = ({ expenses = [] }) => {

    const monthlyExpenses = months.map((month, index) => {
        const filteredExpenses =
            expenses.filter((expense) => {
                return new Date(expense.date).getMonth() === index;
            });

        const total =
            filteredExpenses.reduce((acc, curr) => {
                return acc + Number(curr.amount);
            }, 0);

        return {
            month: month,
            amount: total,
        };
    });

    const maxAmount =
        Math.max(...monthlyExpenses.map((item) =>
            item.amount), 1);

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6">

            <div className="flex items-center justify-between mb-6">

                <h2 className="text-lg font-bold">
                    Expenses Overview
                </h2>

                <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
                    <option>This Year</option>
                    <option>This Month</option>
                </select>

            </div>


            {/* Chart */}
            <div className="h-64 flex items-end justify-between gap-3">

                {monthlyExpenses.map((item) => {

                    const height = item.amount > 0 ? `${(item.amount /
                        maxAmount) * 100}%` : "0%";

                    return (
                        <div
                            key={item.month}
                            className="flex flex-col items-center justify-end h-full flex-1"
                        >

                            {/* Bar */}
                            <div
                                className="w-full max-w-10 bg-blue-600 rounded-t-md hover:bg-blue-700 transition"
                                style={{ height }}
                            >
                            </div>

                            {/* Month */}
                            <span className="text-xs text-gray-500 mt-2">
                                {item.month}
                            </span>

                        </div>
                    );
                })}

            </div>

        </div>
    );
};

export default ExpenseChart;