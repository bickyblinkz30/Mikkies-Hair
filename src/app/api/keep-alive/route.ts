import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  "https://shvmofgaiopeupaywifl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNodm1vZmdhaW9wZXVwYXl3aWZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxMzYzNjIsImV4cCI6MjA5NDcxMjM2Mn0.k3MYbTCX92WWolyfrkp4COU_DnsxhzgJGVSe9BN9lsI"
);

export async function GET() {
  try {
    const { error } = await supabase
      .from("services")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ status: "error", message: error.message }, { status: 500 });
    }

    return NextResponse.json({ status: "ok", pinged_at: new Date().toISOString() });
  } catch (err) {
    return NextResponse.json({ status: "exception", message: String(err) }, { status: 500 });
  }
}
