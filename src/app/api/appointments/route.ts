import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from("appointments")
      .select("*, service:services(*)")
      .order("date", { ascending: true });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('Appointments fetch error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const serviceId = formData.get("serviceId") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const clientName = formData.get("clientName") as string;
    const clientEmail = formData.get("clientEmail") as string;
    const clientPhone = formData.get("clientPhone") as string;
    const notes = formData.get("notes") as string;

    const supabase = createServerClient();

    let serviceName = "Selected Service";
    if (serviceId) {
      try {
        const { data: service } = await supabase
          .from("services")
          .select("name")
          .eq("id", serviceId)
          .single();
        if (service) serviceName = service.name;
      } catch {
        // services table may not exist or IDs may not match
      }
    }

    const timeline = [
      {
        date: new Date().toISOString().split("T")[0],
        action: "Consultation Requested",
        timestamp: new Date().toISOString(),
      },
    ];

    const { data: appointment, error } = await supabase
      .from("appointments")
      .insert({
        date,
        time,
        client_name: clientName,
        client_email: clientEmail,
        client_phone: clientPhone,
        notes,
        status: "pending",
        consultation_timeline: JSON.stringify(timeline),
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Here you would typically send an email, but we'll skip that for now
    // to keep the API focused on the database operations

    return NextResponse.json({ 
      success: true, 
      id: appointment?.id 
    });
  } catch (err) {
    console.error('Appointment creation error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}