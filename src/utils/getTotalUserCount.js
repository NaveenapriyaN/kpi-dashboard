import { supabase } from "../lib/supabaseClient";

export async function getTotalUserCount() {
  const { count, error } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true }); 

  if (error) {
    console.error("Failed to get total user count:", error);
    return 0;
  }

  return count;
}
