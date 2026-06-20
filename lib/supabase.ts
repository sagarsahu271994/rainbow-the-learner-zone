import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
let browserClient: ReturnType<typeof createClient> | undefined;

export function browserSupabase() {
  browserClient ??= createClient(url || "https://placeholder.supabase.co", anon || "configuration-required");
  return browserClient;
}

export function adminSupabase() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) throw new Error("Supabase server environment variables are missing.");
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}

export async function requireAdmin(request: Request) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!token || !url || !anon) return null;
  const client = createClient(url, anon, { auth: { persistSession: false } });
  const { data } = await client.auth.getUser(token);
  const allowed = (process.env.ADMIN_EMAILS || "").split(",").map((e) => e.trim().toLowerCase());
  return data.user?.email && allowed.includes(data.user.email.toLowerCase()) ? data.user : null;
}
