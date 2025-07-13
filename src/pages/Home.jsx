import { useEffect, useState } from "react";
import { getTotalUserCount } from "../utils/getTotalUserCount";
import { Link } from "react-router-dom";

export default function Home() {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
  async function fetchCount() {
    const count = await getTotalUserCount();
    setUserCount(count);
  }

  fetchCount();
}, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center px-4">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
        Welcome to the KPI Dashboard
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Track your metrics, visualize performance and make data-driven decisions.
      </p>
      <p className="text-lg font-medium text-green-700 dark:text-green-300 mb-8">
         {userCount} users have signed up so far!
      </p>
      <div className="space-x-4">
        <Link
          to="/login"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
