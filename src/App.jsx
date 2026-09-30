import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ExpenseSummary from "./components/ExpenseSummary";
import ExpenseForm from "./components/ExpenseForm";
import CategoryFilter from "./components/CategoryFilter";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";
import { useState } from "react";
import { useEffect } from "react";

const App = () => {
  const [expenses, setExpenses] = useState(() => {
    try {
      const saved = localStorage.getItem("expenses");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to load expenses from localStorage", error);
      return [];
    }
  });

  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("userName") ||
      "guest";
  });

  useEffect(() => {
    localStorage.setItem("userName",
      userName);
    }, [userName]);

const [activeTab, setActiveTab] = useState("Dashboard");
const [category, setCategory] = useState("All");
const [search, setSearch] = useState("");
const [sort, setSort] = useState("Newest");
const [editingExpense, setEditingExpense] = useState(null);

const [isSidebarOpen,setIsSidebarOpen] = useState(false);

useEffect(() => {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}, [expenses]);

const addExpense = (newExpense) => {
  setExpenses([...expenses, newExpense]);
};

const deleteExpense = (id) => {
  setExpenses(expenses.filter((expense) => expense.id !== id));
  if (editingExpense?.id === id) {
    setEditingExpense(null);
  }
};

const editExpense = (id) => {
  setEditingExpense(expenses.find((expense) => expense.id === id));
};

const updateExpense = (updatedExpense) => {
  setExpenses(
    expenses.map((expense) => {
      return expense.id === updatedExpense.id ? updatedExpense : expense;
    })
  );
};

const clearAllExpenses = () => {
  if (window.confirm("Are you sure you want to delete all expenses? This cannot be undone.")) {
    setExpenses([]);
    setEditingExpense(null);
  }
};

const exportExpenses = () => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(expenses, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "expenses.json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

const filteredExpenses =
  category === "All" ? expenses : expenses.filter((expense) => expense.category === category);

const searchedExpenses = filteredExpenses.filter((expense) => {
  return (
    expense.title.toLowerCase().includes(search.toLowerCase()) ||
    expense.category.toLowerCase().includes(search.toLowerCase())
  );
});

const sortedExpenses = [...searchedExpenses].sort((a, b) => {
  if (sort === "Highest Amount") {
    return b.amount - a.amount;
  } else if (sort === "Lowest Amount") {
    return a.amount - b.amount;
  } else if (sort === "Newest") {
    return new Date(b.date) - new Date(a.date);
  } else if (sort === "Oldest") {
    return new Date(a.date) - new Date(b.date);
  }
  return 0;
});

return (
  <div className="flex min-h-screen bg-gray-50">
    
    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

    
    <main className="flex-1 min-w-0">
      
      <Navbar setIsSidebarOpen={setIsSidebarOpen} userName={userName} setUserName={setUserName} search={search} setSearch={setSearch} />

      
      <div className="p-6 space-y-6">
       
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{activeTab}</h1>
            <p className="text-sm text-gray-500 mt-1">
              {activeTab === "Dashboard" && "Comprehensive financial overview and recent activity."}
              {activeTab === "Expenses" && "Create, edit, and organize all your expense entries."}
              {activeTab === "Analytics" && "In-depth visual breakdown of your monthly expenses."}
              {activeTab === "Categories" && "Filter and manage your expenses by category."}
              {activeTab === "Settings" && "Export data and manage your application preferences."}
            </p>
          </div>

          <div>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-wider">
              {activeTab} Mode
            </span>
          </div>
        </div>

        
        {activeTab === "Dashboard" && (
          <div className="space-y-6">
            <ExpenseSummary expenses={expenses} />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div>
                <ExpenseForm
                  key={editingExpense ? editingExpense.id : "new"}
                  updateExpense={updateExpense}
                  setEditingExpense={setEditingExpense}
                  editingExpense={editingExpense}
                  addExpense={addExpense}
                />
              </div>

              <div className="xl:col-span-2 space-y-6">
                <CategoryFilter category={category} setCategory={setCategory} />
                <ExpenseList
                  editExpense={editExpense}
                  sort={sort}
                  setSort={setSort}
                  expenses={sortedExpenses}
                  deleteExpense={deleteExpense}
                />
              </div>
            </div>

            <ExpenseChart expenses={expenses} />
          </div>
        )}

        
        {activeTab === "Expenses" && (
          <div className="p-6 bg-white border-2 border-blue-500 rounded-2xl shadow-sm space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div>
                <ExpenseForm
                  key={editingExpense ? editingExpense.id : "new"}
                  updateExpense={updateExpense}
                  setEditingExpense={setEditingExpense}
                  editingExpense={editingExpense}
                  addExpense={addExpense}
                />
              </div>

              <div className="xl:col-span-2 space-y-6">
                <CategoryFilter category={category} setCategory={setCategory} />
                <ExpenseList
                  editExpense={editExpense}
                  sort={sort}
                  setSort={setSort}
                  expenses={sortedExpenses}
                  deleteExpense={deleteExpense}
                />
              </div>
            </div>
          </div>
        )}

        
        {activeTab === "Analytics" && (
          <div className="p-6 bg-white border-2 border-blue-500 rounded-2xl shadow-sm space-y-6">
            <ExpenseSummary expenses={expenses} />
            <ExpenseChart expenses={expenses} />
          </div>
        )}

        
        {activeTab === "Categories" && (
          <div className="p-6 bg-white border-2 border-blue-500 rounded-2xl shadow-sm space-y-6">
            <CategoryFilter category={category} setCategory={setCategory} />
            <ExpenseList
              editExpense={editExpense}
              sort={sort}
              setSort={setSort}
              expenses={sortedExpenses}
              deleteExpense={deleteExpense}
            />
          </div>
        )}

        
        {activeTab === "Settings" && (
          <div className="p-6 bg-white border-2 border-blue-500 rounded-2xl shadow-sm max-w-xl space-y-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Data Management</h2>
              <p className="text-sm text-gray-500 mt-1">Download backup files or reset your local expense history.</p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={exportExpenses}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition cursor-pointer"
              >
                Export Data (JSON)
              </button>

              <button
                type="button"
                onClick={clearAllExpenses}
                className="px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-sm font-medium transition cursor-pointer"
              >
                Clear All Expenses
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  </div>
);
};

export default App;