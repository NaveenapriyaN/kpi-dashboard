import { motion } from "framer-motion";

export default function KPIBox({ label, value, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`p-4 rounded-xl shadow bg-white text-center border-t-4 ${color}`}
    >
      <div className="text-gray-500 text-sm mb-1">{label}</div>
      <div className="text-xl font-bold">{value}</div>
    </motion.div>
  );
}