import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Topbar({ userEmail }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="w-full bg-white shadow-md py-3 px-6 flex justify-between items-center">
      <h1 className="text-xl font-semibold">📊 KPI Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 hidden sm:inline">{userEmail}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
