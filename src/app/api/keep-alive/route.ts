import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  "https://shvmofgaiopeupaywifl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNodm1vZmdhaW9wZXVwYXl3aWZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxMzYzNjIsImV4cCI6MjA5NDcxMjM2Mn0.k3MYbTCX92WWolyfrkp4COU_DnsxhzgJGVSe9BN9lsI"
);

export async function GET() {
  const { error } = await supabase
    .from("_keep_alive_check")
    .select("*")
    .limit(1)
    .maybeSingle();

  // A "relation does not exist" error still means the database was reached,
  // so it counts as activity and is treated as a success.
  const relationMissing =
    error?.code === "42P01" ||
    /relation .* does not exist/i.test(error?.message ?? "");

  if (error && !relationMissing) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    status: "ok",
    pinged_at: new Date().toISOString(),
  });
}
