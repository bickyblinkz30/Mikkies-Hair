import { Resend } from "resend"
import { getWhatsAppNumber } from "@/lib/actions/settings"

type SendEmailParams = {
  clientEmail?: string
  clientName?: string
  serviceName?: string
  date?: string
  time?: string
  stylistName?: string
  type: "confirmation" | "pending" | "declined" | "reminder" | "stylist_pending" | "consultation_requested" | "consultation_confirmed" | "consultation_declined"
  appointmentId?: string
  declineReason?: string
  clientPhone?: string
  notes?: string
}

export async function sendBookingEmail(params: SendEmailParams) {
  if (!process.env.RESEND_API_KEY) {
    console.log("Resend API key not configured. Skipping email send.")
    return { success: false, message: "Email not configured" }
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  const {
    clientEmail = "",
    clientName = "",
    serviceName = "",
    date = "",
    time = "",
    stylistName = "",
    type,
    declineReason = "",
    clientPhone = "",
    notes = "",
  } = params

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/+$/, "") || "https://mikkieshair.com"
  const whatsappNumber = await getWhatsAppNumber()

  const subjects: Record<string, string> = {
    confirmation: "Your Appointment is Confirmed! – Mikkies Hair",
    pending: "Your Booking is Pending Approval – Mikkies Hair",
    declined: "Appointment Update – Mikkies Hair",
    reminder: "Reminder: Your Appointment Tomorrow – Mikkies Hair",
    stylist_pending: "New Booking Request – Mikkies Hair",
    consultation_requested: "New Consultation Request – Mikkies Hair",
    consultation_confirmed: "Appointment Confirmed – Mikkies Hair",
    consultation_declined: "Consultation Update – Mikkies Hair",
  }

  const messages: Record<string, string> = {
    confirmation: `Your appointment for ${serviceName} on ${date} at ${time} has been confirmed. We look forward to seeing you!`,
    pending: `Your appointment request for ${serviceName} on ${date} at ${time} has been received. We will review and confirm shortly.`,
    declined: `Unfortunately, your appointment for ${serviceName} on ${date} at ${time} could not be accommodated. Please book another time.`,
    reminder: `This is a friendly reminder about your ${serviceName} appointment tomorrow, ${date} at ${time}. Please arrive 10 minutes early.`,
    stylist_pending: `${clientName} has submitted a new booking request.`,
    consultation_requested: `${clientName} has submitted a new consultation request.`,
    consultation_confirmed: `Your consultation for ${serviceName} on ${date} has been confirmed. We look forward to seeing you!`,
    consultation_declined: `Your consultation for ${serviceName} could not be accommodated.`,
  }

  let html = ""
  let toEmail = clientEmail

  if (type === "stylist_pending" || type === "consultation_requested") {
    toEmail = "hello@mikkieshair.com"

    const isConsultation = type === "consultation_requested"
    const title = isConsultation ? "New Consultation Request" : "New Booking Request"

    html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 0 auto; padding: 24px;">
          <div style="background: linear-gradient(135deg, #1a1a1a, #0d0d0d); padding: 32px; border-radius: 16px 16px 0 0; text-align: center; border-bottom: 2px solid #C9A84C;">
            <h1 style="color: #C9A84C; font-size: 24px; margin: 0; font-family: 'Playfair Display', Georgia, serif;">Mikkies Hair</h1>
            <p style="color: rgba(255,255,255,0.6); margin-top: 4px; font-size: 14px;">${title}</p>
          </div>
          <div style="background: #111; padding: 32px; border-radius: 0 0 16px 16px;">
            <h2 style="color: #fff; font-size: 20px; margin: 0;">Hello ${stylistName || "Mikkies"},</h2>
            <p style="color: #9ca3af; line-height: 1.6; margin-top: 12px;">
              ${isConsultation ? "A new consultation request has been submitted. Please review and respond via the admin dashboard." : "You have a new booking request."}
            </p>
            <div style="background: #1a1a1a; border-radius: 12px; padding: 20px; margin-top: 20px; border: 1px solid rgba(201,168,76,0.2);">
              <h3 style="color: #C9A84C; font-size: 16px; margin: 0 0 12px;">Client Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #9ca3af; font-size: 14px;">Name</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 600; font-size: 14px; color: #fff;">${clientName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #9ca3af; font-size: 14px; border-top: 1px solid #2a2a2a;">Email</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 600; font-size: 14px; border-top: 1px solid #2a2a2a; color: #fff;">${clientEmail}</td>
                </tr>
                ${clientPhone ? `<tr>
                  <td style="padding: 8px 0; color: #9ca3af; font-size: 14px; border-top: 1px solid #2a2a2a;">Phone</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 600; font-size: 14px; border-top: 1px solid #2a2a2a; color: #fff;">${clientPhone}</td>
                </tr>` : ""}
                <tr>
                  <td style="padding: 8px 0; color: #9ca3af; font-size: 14px; border-top: 1px solid #2a2a2a;">Service</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 600; font-size: 14px; border-top: 1px solid #2a2a2a; color: #fff;">${serviceName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #9ca3af; font-size: 14px; border-top: 1px solid #2a2a2a;">Date</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 600; font-size: 14px; border-top: 1px solid #2a2a2a; color: #fff;">${date}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #9ca3af; font-size: 14px; border-top: 1px solid #2a2a2a;">Time</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 600; font-size: 14px; border-top: 1px solid #2a2a2a; color: #fff;">${time}</td>
                </tr>
                ${notes ? `<tr>
                  <td style="padding: 8px 0; color: #9ca3af; font-size: 14px; border-top: 1px solid #2a2a2a;">Notes</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 600; font-size: 14px; border-top: 1px solid #2a2a2a; color: #fff;">${notes}</td>
                </tr>` : ""}
              </table>
            </div>
            ${isConsultation ? `
            <div style="margin-top: 20px; text-align: center;">
              <a href="${baseUrl}/admin" style="display: inline-block; background: #C9A84C; color: #000; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 14px;">Open Admin Dashboard</a>
              ${whatsappNumber ? `
              <p style="color: #6b7280; font-size: 12px; margin-top: 12px;">
                Or contact via <a href="https://wa.me/${whatsappNumber}" style="color: #C9A84C;">WhatsApp</a>
              </p>` : ""}
            </div>` : ""}
            <p style="color: #6b7280; font-size: 12px; text-align: center; margin-top: 16px;">
              Manage all requests from your admin dashboard.
            </p>
          </div>
          <div style="text-align: center; padding-top: 16px;">
            <p style="color: #6b7280; font-size: 12px;">
              &copy; ${new Date().getFullYear()} Mikkies Hair. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  } else if (type === "consultation_declined") {
    html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 0 auto; padding: 24px;">
          <div style="background: linear-gradient(135deg, #1a1a1a, #0d0d0d); padding: 32px; border-radius: 16px 16px 0 0; text-align: center; border-bottom: 2px solid #C9A84C;">
            <h1 style="color: #C9A84C; font-size: 24px; margin: 0; font-family: 'Playfair Display', Georgia, serif;">Mikkies Hair</h1>
            <p style="color: rgba(255,255,255,0.6); margin-top: 4px; font-size: 14px;">Consultation Update</p>
          </div>
          <div style="background: #111; padding: 32px; border-radius: 0 0 16px 16px;">
            <h2 style="color: #fff; font-size: 20px; margin: 0;">Hello ${clientName},</h2>
            <p style="color: #9ca3af; line-height: 1.6; margin-top: 12px;">Thank you for your interest in Mikkies Hair. Unfortunately, your consultation request could not proceed at this time.</p>
            ${declineReason ? `
            <div style="background: #1a1a1a; border-radius: 12px; padding: 20px; margin-top: 20px; border: 1px solid rgba(201,168,76,0.2);">
              <h3 style="color: #C9A84C; font-size: 16px; margin: 0 0 12px;">Reason</h3>
              <p style="color: #9ca3af; font-size: 14px; margin: 0;">${declineReason}</p>
            </div>` : ""}
            <div style="background: #1a1a1a; border-radius: 12px; padding: 20px; margin-top: 16px; border: 1px solid rgba(201,168,76,0.2);">
              <h3 style="color: #C9A84C; font-size: 16px; margin: 0 0 12px;">Request Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #9ca3af; font-size: 14px;">Service</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 600; font-size: 14px; color: #fff;">${serviceName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #9ca3af; font-size: 14px; border-top: 1px solid #2a2a2a;">Date</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 600; font-size: 14px; border-top: 1px solid #2a2a2a; color: #fff;">${date}</td>
                </tr>
              </table>
            </div>
            <p style="color: #6b7280; font-size: 13px; margin-top: 20px;">
              If you'd like to discuss further, please reach out to us at hello@mikkieshair.com
            </p>
          </div>
          <div style="text-align: center; padding-top: 16px;">
            <p style="color: #6b7280; font-size: 12px;">
              &copy; ${new Date().getFullYear()} Mikkies Hair. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  } else if (type === "consultation_confirmed") {
    html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 0 auto; padding: 24px;">
          <div style="background: linear-gradient(135deg, #1a1a1a, #0d0d0d); padding: 32px; border-radius: 16px 16px 0 0; text-align: center; border-bottom: 2px solid #C9A84C;">
            <h1 style="color: #C9A84C; font-size: 24px; margin: 0; font-family: 'Playfair Display', Georgia, serif;">Mikkies Hair</h1>
            <p style="color: rgba(255,255,255,0.6); margin-top: 4px; font-size: 14px;">Appointment Confirmed</p>
          </div>
          <div style="background: #111; padding: 32px; border-radius: 0 0 16px 16px;">
            <h2 style="color: #fff; font-size: 20px; margin: 0;">Hello ${clientName},</h2>
            <p style="color: #9ca3af; line-height: 1.6; margin-top: 12px;">${messages.consultation_confirmed}</p>
            <div style="background: #1a1a1a; border-radius: 12px; padding: 20px; margin-top: 20px; border: 1px solid rgba(201,168,76,0.2);">
              <h3 style="color: #C9A84C; font-size: 16px; margin: 0 0 12px;">Appointment Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #9ca3af; font-size: 14px;">Service</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 600; font-size: 14px; color: #fff;">${serviceName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #9ca3af; font-size: 14px; border-top: 1px solid #2a2a2a;">Date</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 600; font-size: 14px; border-top: 1px solid #2a2a2a; color: #fff;">${date}</td>
                </tr>
                ${time ? `<tr>
                  <td style="padding: 8px 0; color: #9ca3af; font-size: 14px; border-top: 1px solid #2a2a2a;">Time</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 600; font-size: 14px; border-top: 1px solid #2a2a2a; color: #fff;">${time}</td>
                </tr>` : ""}
                <tr>
                  <td style="padding: 8px 0; color: #9ca3af; font-size: 14px; border-top: 1px solid #2a2a2a;">Status</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 600; font-size: 14px; border-top: 1px solid #2a2a2a; color: #22c55e;">Confirmed</td>
                </tr>
              </table>
            </div>
            <p style="color: #6b7280; font-size: 13px; margin-top: 20px;">
              Need to reschedule? Contact us at hello@mikkieshair.com
            </p>
          </div>
          <div style="text-align: center; padding-top: 16px;">
            <p style="color: #6b7280; font-size: 12px;">
              &copy; ${new Date().getFullYear()} Mikkies Hair. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  } else {
    html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 0 auto; padding: 24px;">
          <div style="background: linear-gradient(135deg, #1a1a1a, #0d0d0d); padding: 32px; border-radius: 16px 16px 0 0; text-align: center; border-bottom: 2px solid #C9A84C;">
            <h1 style="color: #C9A84C; font-size: 24px; margin: 0; font-family: 'Playfair Display', Georgia, serif;">Mikkies Hair</h1>
            <p style="color: rgba(255,255,255,0.6); margin-top: 4px; font-size: 14px;">Premium Salon Experience</p>
          </div>
          <div style="background: #111; padding: 32px; border-radius: 0 0 16px 16px;">
            <h2 style="color: #fff; font-size: 20px; margin: 0;">Hello ${clientName},</h2>
            <p style="color: #9ca3af; line-height: 1.6; margin-top: 12px;">${messages[type]}</p>
            <div style="background: #1a1a1a; border-radius: 12px; padding: 20px; margin-top: 20px; border: 1px solid rgba(201,168,76,0.2);">
              <h3 style="color: #C9A84C; font-size: 16px; margin: 0 0 12px;">Appointment Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #9ca3af; font-size: 14px;">Service</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 600; font-size: 14px; color: #fff;">${serviceName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #9ca3af; font-size: 14px; border-top: 1px solid #2a2a2a;">Date</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 600; font-size: 14px; border-top: 1px solid #2a2a2a; color: #fff;">${date}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #9ca3af; font-size: 14px; border-top: 1px solid #2a2a2a;">Time</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 600; font-size: 14px; border-top: 1px solid #2a2a2a; color: #fff;">${time}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #9ca3af; font-size: 14px; border-top: 1px solid #2a2a2a;">Stylist</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 600; font-size: 14px; border-top: 1px solid #2a2a2a; color: #fff;">${stylistName}</td>
                </tr>
              </table>
            </div>
            <div style="background: rgba(201,168,76,0.1); border-radius: 12px; padding: 16px; margin-top: 16px; border: 1px solid rgba(201,168,76,0.2);">
              <p style="color: #C9A84C; font-size: 13px; margin: 0;">
                Payment: Cash (pay at appointment) &bull; Please arrive 10 minutes early
              </p>
            </div>
            <p style="color: #6b7280; font-size: 13px; margin-top: 20px;">
              Need to reschedule? Contact us at hello@mikkieshair.com
            </p>
          </div>
          <div style="text-align: center; padding-top: 16px;">
            <p style="color: #6b7280; font-size: 12px;">
              &copy; ${new Date().getFullYear()} Mikkies Hair. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Mikkies Hair <bookings@mikkieshair.com>",
      to: [toEmail],
      subject: subjects[type],
      html,
    })

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error("Failed to send email:", error)
    return { success: false, message: "Failed to send email" }
  }
}
