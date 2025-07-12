import TopbarPublic from "../components/TopbarPublic";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
  e.preventDefault();
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    setError(error.message);
  } else {
    navigate("/email-confirmation");
  }
};


  return (
    <>
    <TopbarPublic/>
    <div className="p-6 max-w-md mx-auto">
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
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
