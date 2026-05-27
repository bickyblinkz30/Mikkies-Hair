import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

type SendBookingEmailParams = {
  clientEmail: string
  clientName: string
  serviceName: string
  date: string
  time: string
  stylistName: string
  type: "confirmation" | "pending" | "declined" | "reminder"
}

export async function sendBookingEmail({
  clientEmail,
  clientName,
  serviceName,
  date,
  time,
  stylistName,
  type,
}: SendBookingEmailParams) {
  if (!process.env.RESEND_API_KEY) {
    console.log("Resend API key not configured. Skipping email send.")
    return { success: false, message: "Email not configured" }
  }

  const subjects: Record<string, string> = {
    confirmation: "Your StyleSlot Booking is Confirmed!",
    pending: "Your StyleSlot Booking is Pending Approval",
    declined: "StyleSlot Booking Update",
    reminder: "Reminder: Your StyleSlot Appointment Tomorrow",
  }

  const messages: Record<string, string> = {
    confirmation: `Your appointment for ${serviceName} on ${date} at ${time} has been confirmed by ${stylistName}. We look forward to seeing you!`,
    pending: `Your appointment request for ${serviceName} on ${date} at ${time} has been received. ${stylistName} will review and confirm shortly.`,
    declined: `Unfortunately, your appointment for ${serviceName} on ${date} at ${time} could not be accommodated. Please book another time.`,
    reminder: `This is a friendly reminder about your ${serviceName} appointment tomorrow, ${date} at ${time} with ${stylistName}. Please arrive 10 minutes early.`,
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "StyleSlot <bookings@styleslot.com>",
      to: [clientEmail],
      subject: subjects[type],
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 0 auto; padding: 24px;">
            <div style="background: linear-gradient(135deg, #6D28D9, #8B5CF6); padding: 32px; border-radius: 16px 16px 0 0; text-align: center;">
              <h1 style="color: white; font-size: 24px; margin: 0;">StyleSlot</h1>
              <p style="color: rgba(255,255,255,0.8); margin-top: 4px; font-size: 14px;">Premium Beauty Booking</p>
            </div>
            <div style="background: white; padding: 32px; border-radius: 0 0 16px 16px;">
              <h2 style="color: #111827; font-size: 20px; margin: 0;">Hello ${clientName},</h2>
              <p style="color: #6b7280; line-height: 1.6; margin-top: 12px;">${messages[type]}</p>
              <div style="background: #f9fafb; border-radius: 12px; padding: 20px; margin-top: 20px;">
                <h3 style="color: #111827; font-size: 16px; margin: 0 0 12px;">Appointment Details</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Service</td>
                    <td style="padding: 8px 0; text-align: right; font-weight: 600; font-size: 14px;">${serviceName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb;">Date</td>
                    <td style="padding: 8px 0; text-align: right; font-weight: 600; font-size: 14px; border-top: 1px solid #e5e7eb;">${date}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb;">Time</td>
                    <td style="padding: 8px 0; text-align: right; font-weight: 600; font-size: 14px; border-top: 1px solid #e5e7eb;">${time}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb;">Stylist</td>
                    <td style="padding: 8px 0; text-align: right; font-weight: 600; font-size: 14px; border-top: 1px solid #e5e7eb;">${stylistName}</td>
                  </tr>
                </table>
              </div>
              <div style="background: #EDE9FE; border-radius: 12px; padding: 16px; margin-top: 16px;">
                <p style="color: #6D28D9; font-size: 13px; margin: 0;">
                  Payment: Cash (pay at appointment) • Please arrive 10 minutes early
                </p>
              </div>
              <p style="color: #6b7280; font-size: 13px; margin-top: 20px;">
                Need to reschedule? Contact us at contact@styleslot.com
              </p>
            </div>
            <div style="text-align: center; padding-top: 16px;">
              <p style="color: #9ca3af; font-size: 12px;">
                &copy; ${new Date().getFullYear()} StyleSlot. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error("Failed to send email:", error)
    return { success: false, message: "Failed to send email" }
  }
}
