import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { sendBookingEmail } from '@/lib/email';
import { STYLIST_NAME } from '@/lib/constants';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status, declineReason } = await req.json();
    const appointmentId = params.id;

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      );
    }

    const supabase = await createServerClient();

    const { data: appointment } = await supabase
      .from("appointments")
      .select("*, service:services(*)")
      .eq("id", appointmentId)
      .single();

    if (!appointment) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }

    const currentTimeline = (appointment.consultation_timeline as Array<{date: string; action: string; timestamp: string}>) || [];
    const timelineAction = status === "confirmed"
      ? "Confirmed"
      : status === "declined"
        ? "Declined"
        : status === "contacted"
          ? "WhatsApp Contacted"
          : status === "completed"
            ? "Completed"
            : status;

    const timelineEntry = {
      date: new Date().toISOString().split("T")[0],
      action: timelineAction,
      timestamp: new Date().toISOString(),
    };

    const updateData: Record<string, unknown> = {
      status,
      consultation_timeline: JSON.stringify([...currentTimeline, timelineEntry]),
    };

    if (declineReason) {
      updateData.decline_reason = declineReason;
    }

    const { error } = await supabase
      .from("appointments")
      .update(updateData)
      .eq("id", appointmentId);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Send email notifications
    const formattedDate = new Date(appointment.date + "T12:00:00").toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const serviceName = appointment.service?.name || "Selected Service";

    if (status === "confirmed") {
      await sendBookingEmail({
        clientEmail: appointment.client_email,
        clientName: appointment.client_name,
        serviceName,
        date: formattedDate,
        time: appointment.time,
        stylistName: STYLIST_NAME,
        type: "consultation_confirmed",
      });
    } else if (status === "declined") {
      await sendBookingEmail({
        clientEmail: appointment.client_email,
        clientName: appointment.client_name,
        serviceName,
        date: formattedDate,
        time: appointment.time,
        stylistName: STYLIST_NAME,
        type: "consultation_declined",
        declineReason,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Status update error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}