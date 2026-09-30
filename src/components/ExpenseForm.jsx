import { Plus } from "lucide-react";
import { useState } from "react";

const ExpenseForm = ({ updateExpense, setEditingExpense, editingExpense, addExpense }) => {

    const [title, setTitle] = useState(editingExpense ? editingExpense.title : "");
    const [amount, setAmount] = useState(editingExpense ? editingExpense.amount : "");
    const [category, setCategory] = useState(editingExpense ? editingExpense.category : "Food");
    const [date, setDate] = useState(editingExpense ? editingExpense.date : "");
    const [notes, setNotes] = useState(editingExpense ? editingExpense.notes : "");
    const [titleError, setTitleError] = useState(false);
    const [amountError, setAmountError] = useState(false);
    const [dateError, setDateError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const hasTitleError = title.trim() === "";
        const hasAmountError = !amount || Number(amount) <= 0;
        const hasDateError = date === "";

        setTitleError(hasTitleError);
        setAmountError(hasAmountError);
        setDateError(hasDateError)
        if (hasTitleError || hasAmountError || hasDateError) {
            return;
        }

        const newExpense = {
            id: editingExpense ? editingExpense.id :
                Date.now(),
            title,
            amount,
            category,
            date,
            notes,
        }

        if (editingExpense) {
            updateExpense(newExpense)
        } else {
            addExpense(newExpense);
        }
        setEditingExpense(null);
        setTitle("")
        setAmount("")
        setCategory("Food")
        setDate("")
        setNotes("")
    }


    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6">

            <h2 className="text-lg font-bold mb-6">
                {editingExpense ? "Edit Expense" : "Add New Expense"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Title */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Title
                    </label>

                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        type="text"
                        placeholder="Enter expense title"
                        className={`w-full border ${titleError ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {titleError && <p className="text-red-500 text-xs mt-1">Title is required</p>}
                </div>


                {/* Amount + Category */}
                <div className="grid grid-cols-2 gap-4">

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Amount
                        </label>

                        <input
                            onChange={(e) => setAmount(Number(e.target.value))}
                            value={amount}
                            type="number"
                            placeholder="₹ 0.00"
                            className={`w-full border ${amountError ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {amountError && <p className="text-red-500 text-xs mt-1">Please enter a valid amount</p>}
                    </div>


                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Category
                        </label>

                        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500">

                            <option>Food</option>
                            <option>Transport</option>
                            <option>Shopping</option>
                            <option>Bills</option>
                            <option>Health</option>
                            <option>Education</option>
                            <option>Other</option>
                        </select>
                    </div>

                </div>


                {/* Date */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Date
                    </label>

                    <input
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        type="date"
                        className={`w-full border ${dateError ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {dateError && <p className="text-red-500 text-xs mt-1">Date is required</p>}
                </div>


                {/* Notes */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Notes (Optional)
                    </label>

                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add a note..."
                        rows="3"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                </div>


                {/* Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium"
                >
                    <Plus size={20} />
                    {editingExpense ? "Update Expense" : "Add Expense"}
                </button>

            </form>

        </div>
    );
};

export default ExpenseForm;