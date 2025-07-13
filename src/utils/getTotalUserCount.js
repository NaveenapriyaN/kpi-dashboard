import { supabase } from "../lib/supabaseClient";

export async function getTotalUserCount() {
  const { data, error } = await supabase.rpc("get_user_count");

  if (error) {
    console.error("User count fetch failed:", error);
    return 0;
  }

  return data;
}
