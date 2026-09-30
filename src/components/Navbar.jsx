import { Search, Moon, ChevronDown, Menu } from "lucide-react";

const Navbar = ({ userName, setUserName, search, setSearch, setIsSidebarOpen }) => {
    return (
        <nav className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6">

            
            <div className="flex items-center gap-3 flex-1 max-w-xs sm:max-w-md">
                
                <button
                    type="button"
                    onClick={() => setIsSidebarOpen(true)}
                    className="md:hidden text-gray-600 hover:text-gray-900 p-1 cursor-pointer"
                    aria-label="Open sidebar"
                >
                    <Menu size={24} />
                </button>

                
                <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg flex-1">
                    <Search size={18} className="text-gray-500" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent outline-none w-full text-sm"
                    />
                </div>
            </div>


            {/* Right Side */}
            <div className="flex items-center gap-6">

                {/* Dark Mode Button */}
                <button className="text-gray-600 hover:text-gray-900">
                    <Moon size={21} />
                </button>


                {/* Profile */}
                <div className="flex items-center gap-3 cursor-pointer">

                    {/* Avatar */}
                    <div onClick={() => {
                        const newName = prompt("Enter your name:",
                            userName);
                        if (newName && newName.trim() !== "") {
                            setUserName(newName.trim());
                        }
                    }}
                        className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-sm font-semibold">
                            {userName.trim()[0]?.toUpperCase() || "U"}
                        </span>
                    </div>

                    {/* Name */}
                    <span className="text-sm font-medium">
                        {userName}
                    </span>

                    {/* Dropdown Icon */}
                    <ChevronDown size={18} className="text-gray-500" />

                </div>

            </div>

        </nav>
    );
};

export default Navbar;