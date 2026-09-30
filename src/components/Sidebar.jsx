import {
    LayoutDashboard,
    Receipt,
    BarChart3,
    Tags,
    Settings,
    X
} from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen }) => {

    const navItems = [
        { name: "Dashboard", icon: LayoutDashboard },
        { name: "Expenses", icon: Receipt },
        { name: "Analytics", icon: BarChart3 },
        { name: "Categories", icon: Tags },
        { name: "Settings", icon: Settings },
    ];
    return (
        <>
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-xs transition-opacity"
                />
            )}
            <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 min-h-screen bg-slate-900 text-white p-5 flex flex-col transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
            >

                {/* Logo */}
                <div className="flex items-center justify-between gap-3 mb-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Receipt size={22} />
                        </div>
                        <h1 className="text-xl font-bold">
                            ExpenseTrack
                        </h1>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden text-slate-400 hover:text-white p-1 cursor-pointer"
                        aria-label="Close sidebar"
                    >
                        <X size={20} />
                    </button>
                </div>


                {/* Navigation */}
                <nav className="space-y-2 flex-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.name;

                        return (
                            <button
                                key={item.name}
                                type="button"
                                onClick={() => {
                                    setActiveTab(item.name);
                                    setIsSidebarOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition cursor-pointer text-left ${isActive
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

            </aside>
        </>
    );
};

export default Sidebar;