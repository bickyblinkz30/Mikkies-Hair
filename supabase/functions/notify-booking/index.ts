import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const payload = await req.json();
  const record = payload.record;

  const emailBody = `
    New Booking at Mikkies Hair!
    
    Name: ${record.name}
    Email: ${record.email}
    Phone: ${record.phone}
    Service: ${record.service}
    Date: ${record.date}
    Time: ${record.time}
  `;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "bookings@mikkieshair.com",
      to: "hello@mikkieshair.com",
      subject: `New Booking: ${record.name} – ${record.service}`,
      text: emailBody,
    }),
  });

  return new Response("OK", { status: 200 });
});
