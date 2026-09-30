import {
    LayoutDashboard,
    Receipt,
    BarChart3,
    Tags,
    Settings
} from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab }) => {

    const navItems = [
        { name: "Dashboard", icon: LayoutDashboard },
        { name: "Expenses", icon: Receipt },
        { name: "Analytics", icon: BarChart3 },
        { name: "Categories", icon: Tags },
        { name: "Settings", icon: Settings },
    ];
    return (
        <aside className="w-64 min-h-screen bg-slate-900 text-white p-5">

            {/* Logo */}
            <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Receipt size={22} />
                </div>

                <h1 className="text-xl font-bold">
                    ExpenseTrack
                </h1>
            </div>


            {/* Navigation */}
            <nav className="space-y-2">

                <nav className="space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.name;

                        return (
                            <button
                                key={item.name}
                                onClick={() => setActiveTab(item.name)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${isActive
                                        ? "bg-blue-600 text-white border border-blue-400 shadow-md"
                                        : "text-slate-300 hover:bg-slate-800 hover:text-white border border-transparent"
                                    }`}
                            >
                                <Icon size={20} />
                                <span>{item.name}</span>
                            </button>
                        );
                    })}
                </nav>

            </nav>

        </aside>
    );
};

export default Sidebar;