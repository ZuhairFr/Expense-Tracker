import {
    Utensils,
    Car,
    ShoppingBag,
    Receipt,
    Heart,
    GraduationCap
} from "lucide-react";

const categories = [
    {
        name: "All",
        icon: null
    },
    {
        name: "Food",
        icon: Utensils
    },
    {
        name: "Transport",
        icon: Car
    },
    {
        name: "Shopping",
        icon: ShoppingBag
    },
    {
        name: "Bills",
        icon: Receipt
    },
    {
        name: "Health",
        icon: Heart
    },
    {
        name: "Education",
        icon: GraduationCap
    }
];

    const CategoryFilter = ({ category, setCategory }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5">

            <h2 className="font-bold mb-4">
                Filter by Category
            </h2>

            <div className="flex gap-3 overflow-x-auto">

                {categories.map((categoryItem) => {

                    const Icon = categoryItem.icon;

                    return (
                        <button
                            onClick={() => setCategory(categoryItem.name)}
                            key={categoryItem.name}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium ${
                                category === categoryItem.name
                                    ? "bg-slate-900 text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >

                            {Icon && <Icon size={16} />}

                            {categoryItem.name}

                        </button>
                    );
                })}

            </div>

        </div>
    );
};

export default CategoryFilter;