import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import KPIBox from "../components/KPIBox";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [form, setForm] = useState({ revenue: "", churn_percent: "", dau: "", month: "" });
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user);
        fetchData(session.user.id);
      }
    };

    fetchUser();
  }, []);

  const fetchData = async (uid) => {
    const { data, error } = await supabase
      .from("metrics")
      .select("*")
      .eq("user_id", uid)
      .order("month", { ascending: true });

    if (!error) setData(data);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const monthStr = form.month || new Date().toISOString().slice(0, 7);
    const payload = {
      month: monthStr,
      revenue: parseFloat(form.revenue),
      churn_percent: parseFloat(form.churn_percent),
      dau: parseInt(form.dau),
      user_id: user.id,
    };

    let error;
    if (editingId) {
      ({ error } = await supabase.from("metrics").update(payload).eq("id", editingId));
      if (!error) toast.success("KPI updated!");
      setEditingId(null);
    } else {
      ({ error } = await supabase.from("metrics").insert(payload));
      if (!error) toast.success("KPI saved!");
    }

    if (!error) {
      setForm({ revenue: "", churn_percent: "", dau: "", month: "" });
      fetchData(user.id);
    } else {
      toast.error("Error: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this KPI entry?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("metrics").delete().eq("id", id);
    if (!error) {
      fetchData(user.id);
      toast.success("KPI deleted!");
    } else {
      toast.error("Delete error: " + error.message);
    }
  };

  const handleEditTrigger = (entry) => {
    setForm({
      revenue: entry.revenue,
      churn_percent: entry.churn_percent,
      dau: entry.dau,
      month: entry.month,
    });
    setEditingId(entry.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex bg-bg min-h-screen text-gray-800">
      <Sidebar />
      <div className="flex-1">
        <Topbar userEmail={user?.email} />

        <main className="p-6">
          {/* KPI Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <KPIBox label="Revenue (₹)" value={data.at(-1)?.revenue || "—"} color="border-blue-500" />
            <KPIBox label="Churn (%)" value={data.at(-1)?.churn_percent || "—"} color="border-green-500" />
            <KPIBox label="DAU" value={data.at(-1)?.dau || "—"} color="border-purple-500" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
            <input
              type="month"
              name="month"
              className="border p-2 rounded"
              value={form.month}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="revenue"
              placeholder="Revenue (₹)"
              className="border p-2 rounded"
              value={form.revenue}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="churn_percent"
              placeholder="Churn %"
              className="border p-2 rounded"
              value={form.churn_percent}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="dau"
              placeholder="DAU"
              className="border p-2 rounded"
              value={form.dau}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
            >
              {editingId ? "Update KPI" : "Save KPI"}
            </button>
          </form>

          {/* Chart */}
          <ResponsiveContainer width="100%" height={300} className="mb-8">
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis
      dataKey="month"
      tickFormatter={(m) => {
        const date = new Date(`${m}-01`);
        return date.toLocaleString("default", { month: "short", year: "numeric" });
      }}
    />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="revenue" stroke="#6366f1" />
    <Line type="monotone" dataKey="churn_percent" stroke="#22c55e" />
  </LineChart>
</ResponsiveContainer>

          {/* Table */}
          <h2 className="text-xl font-bold mt-10 mb-2">📋 KPI Entries</h2>
          <table className="w-full text-sm border border-gray-200 rounded mb-8">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Month</th>
                <th className="p-2 text-left">Revenue</th>
                <th className="p-2 text-left">Churn %</th>
                <th className="p-2 text-left">DAU</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry) => (
                <tr key={entry.id} className="border-t">
                  <td className="p-2">{entry.month}</td>
                  <td className="p-2">{entry.revenue}</td>
                  <td className="p-2">{entry.churn_percent}</td>
                  <td className="p-2">{entry.dau}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => handleEditTrigger(entry)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}
