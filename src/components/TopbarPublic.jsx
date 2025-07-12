import { Link, useLocation } from "react-router-dom";

export default function TopbarPublic() {
  const { pathname } = useLocation();

  return (
    <div className="w-full px-6 py-4 bg-white shadow-md flex justify-between items-center dark:bg-gray-900 dark:text-white">
      <Link to="/" className="text-xl font-bold text-blue-600">
        KPI Dashboard
      </Link>
      <div>
        {pathname === "/login" && (
          <Link
            to="/register"
            className="text-sm text-blue-500 hover:underline"
          >
            Don't have an account? Register
          </Link>
        )}
        {pathname === "/register" && (
          <Link
            to="/login"
            className="text-sm text-blue-500 hover:underline"
          >
            Already have an account? Login
          </Link>
        )}
      </div>
    </div>
  );
}
