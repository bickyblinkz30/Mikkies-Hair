import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from("settings")
      .select("key, value")
      .eq("key", "whatsapp_number")
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error("Failed to fetch WhatsApp number:", error);
      return NextResponse.json({ error: 'Failed to fetch WhatsApp number' }, { status: 500 });
    }

    const whatsappNumber = data?.value || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "447123456789";
    return NextResponse.json({ whatsappNumber });
  } catch (err) {
    console.error('WhatsApp number fetch error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Validate phone number format
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 15) {
      return NextResponse.json(
        { error: 'Invalid phone number length' },
        { status: 400 }
      );
    }

    const supabase = await createServerClient();

    const { error } = await supabase
      .from("settings")
      .upsert({ 
        key: "whatsapp_number", 
        value: digits 
      }, { onConflict: "key" });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      whatsappNumber: digits 
    });
  } catch (err) {
    console.error('WhatsApp number update error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}