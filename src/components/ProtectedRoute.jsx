import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) =>
      setSession(session)
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!session) return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedRoute;
