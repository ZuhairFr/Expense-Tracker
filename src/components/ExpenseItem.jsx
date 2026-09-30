import {
    Utensils,
    Car,
    ShoppingBag,
    Receipt,
    Heart,
    MoreVertical,
    Trash
} from "lucide-react";

const ExpenseItem = ({ editExpense, expense, deleteExpense }) => {

    const icons = {
        Food: Utensils,
        Transport: Car,
        Shopping: ShoppingBag,
        Bills: Receipt,
        Health: Heart
    };

    const Icon = icons[expense.category] || Receipt;

    return (
        <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-none">

            {/* Left */}
            <div className="flex items-center gap-4">

                <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center">
                    <Icon size={20} />
                </div>

                <div>
                    <h3 className="font-medium">
                        {expense.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                        {expense.date}
                    </p>
                </div>

            </div>


            {/* Middle */}
            <span className="hidden sm:block text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                {expense.category}
            </span>


            {/* Right */}
            <div className="flex items-center gap-3">

                <span className="font-semibold text-red-500">
                    - ₹{expense.amount}
                </span>

                <button onClick={() => deleteExpense(expense.id)} className="p-2 hover:bg-gray-100 rounded-lg">
                    <Trash />
                </button>

                <button onClick={() => editExpense(expense.id)} className="p-2 hover:bg-gray-100 rounded-lg" >
                    <MoreVertical size={18} />
                </button>

            </div>

        </div>
    );
};

export default ExpenseItem;