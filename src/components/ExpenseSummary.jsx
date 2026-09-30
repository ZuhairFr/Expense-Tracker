import {
    TrendingUp,
    Wallet,
    PieChart,
    Receipt
} from "lucide-react";

const ExpenseSummary = ({ expenses }) => {

    const total = expenses.reduce(
        (sum, expense) => sum + expense.amount, 0
    )

    const now = new Date();

    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const thisMonthExpense = expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);

        return (
            expenseDate.getMonth() === currentMonth &&
            expenseDate.getFullYear() === currentYear
        );
    });

    const thisMonthTotal = thisMonthExpense.reduce(
        (total, expense) => total + expense.amount,
        0
    );


    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const lastMonthExpenses = expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (
            expenseDate.getMonth() === lastMonth &&
            expenseDate.getFullYear() === lastMonthYear
        );
    });

    
    const lastMonthTotal = lastMonthExpenses.reduce(
        (total, expense) => total + expense.amount,
        0
    );

    const percentageChange =
        lastMonthTotal === 0
            ? thisMonthTotal > 0 ? 100 : 0
            : ((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;
    
    const categoryTotals = expenses.reduce(
        (categoryTotals, expense) => {
            categoryTotals[expense.category] =
                (categoryTotals[expense.category] || 0) + expense.amount;
            return categoryTotals;
        }, {});

    const topCategory = Object.entries(categoryTotals).reduce(
        (best, pair) => {
            return pair[1] > best[1] ? pair : best;
        },
        ["", 0]
    );

    const topCategoryPercentage =
        total === 0 ? 0 : (topCategory[1] / total) * 100;

    const monthlyCategoryTotals = thisMonthExpense.reduce(
        (categoryTotals, expense) => {
            categoryTotals[expense.category] =
                (categoryTotals[expense.category] || 0) + expense.amount;

            return categoryTotals;
        },
        {}
    );

    const topMonthlyCategory = Object.entries(monthlyCategoryTotals).reduce(
        (best, pair) => {
            return pair[1] > best[1] ? pair : best;
        },
        ["None", 0]
    );

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

            {/* Total Expenses */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center justify-between">

                    <div>
                        <p className="text-sm text-gray-500">
                            Total Expenses
                        </p>

                        <h2 className="text-2xl font-bold mt-2">
                            ₹{total}
                        </h2>

                        <p className={`text-sm mt-2 font-medium ${percentageChange > 0 ? "text-red-500" : "text-green-600"}`}>
                            {percentageChange >= 0 ? `+${percentageChange.toFixed(0)}%` : `${percentageChange.toFixed(0)}%`} vs last month
                        </p>
                    </div>

                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                        <TrendingUp
                            size={22}
                            className="text-green-600"
                        />
                    </div>

                </div>
            </div>


            {/* This Month */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center justify-between">

                    <div>
                        <p className="text-sm text-gray-500">
                            This Month
                        </p>

                        <h2 className="text-2xl font-bold mt-2">
                            ₹{thisMonthTotal}
                        </h2>

                        <p className="text-sm text-gray-500 mt-2">
                            Top: {topMonthlyCategory[0]} (₹{topMonthlyCategory[1]})
                        </p>
                    </div>

                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                        <Wallet
                            size={22}
                            className="text-red-500"
                        />
                    </div>

                </div>
            </div>


            {/* Top Category */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center justify-between">

                    <div>
                        <p className="text-sm text-gray-500">
                            Top Category
                        </p>

                        <h2 className="text-2xl font-bold mt-2">
                            {topCategory[0] || "None"}
                        </h2>

                        <p className="text-sm text-gray-500 mt-2">
                            ₹{topCategory[1]} {topCategoryPercentage.toFixed(0)}%
                        </p>
                    </div>

                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <PieChart
                            size={22}
                            className="text-blue-600"
                        />
                    </div>

                </div>
            </div>


            {/* Transactions */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center justify-between">

                    <div>
                        <p className="text-sm text-gray-500">
                            Total Transactions
                        </p>

                        <h2 className="text-2xl font-bold mt-2">
                            {expenses.length}
                        </h2>

                        <p className="text-sm text-green-600 mt-2">
                            +{thisMonthExpense.length} new this month
                        </p>
                    </div>

                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                        <Receipt
                            size={22}
                            className="text-purple-600"
                        />
                    </div>

                </div>
            </div>

        </section>
    );
};

export default ExpenseSummary;