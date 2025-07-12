import { Link, useLocation } from "react-router-dom";
import { Moon, Sun } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const current = location.pathname;

  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      html.classList.add("dark");
      localStorage.theme = "dark";
    }
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Reports", path: "#", disabled: true },
    { name: "Growth Analytics", path: "#", disabled: true },
    { name: "Team Access", path: "#", disabled: true },
    { name: "Invoices", path: "#", disabled: true },
  ];

  return (
    <aside className="w-60 min-h-screen bg-white dark:bg-gray-900 border-r dark:border-gray-800 shadow-sm px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">
        Menu
      </h2>
      <nav className="space-y-2">
        {navItems.map((item) =>
          item.disabled ? (
            <span
              key={item.name}
              className="block px-3 py-2 text-gray-400 dark:text-gray-600 cursor-not-allowed"
            >
              {item.name} <span className="text-xs">(Coming Soon)</span>
            </span>
          ) : (
            <Link
              key={item.name}
              to={item.path}
              className={`block px-3 py-2 rounded ${
                current === item.path
                  ? "bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-white font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {item.name}
            </Link>
          )
        )}
      </nav>

      {/* Night Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="mt-10 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
      >
        <Moon className="w-4 h-4" />
        Toggle Dark Mode
      </button>
    </aside>
  );
}
