import TopbarPublic from "../components/TopbarPublic";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      if (error.message.toLowerCase().includes("user already registered")) {
        toast.error("This email is already registered. Please log in.");
      } else {
        toast.error(error.message); // shows "User already registered" if duplicate
      }
    return;
    }
    
  };

  return (
    <>
      <TopbarPublic />
      <div className="p-6 max-w-md mx-auto">
        <div className="flex justify-center items-center h-screen">
          <form
            onSubmit={handleRegister}
            className="bg-white p-6 rounded-lg shadow-md w-80"
          >
            <h2 className="text-xl font-bold mb-4">Register</h2>
            <input
              type="email"
              placeholder="Email"
              className="input-style"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input-style mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white w-full mt-4 p-2 rounded"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
