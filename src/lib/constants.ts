export const SITE_NAME = "Mikkies Hair"
export const SITE_DESCRIPTION = "Premium salon experience — Radiate confidence. Stay cute."
export const SITE_URL = "https://mikkies-hair.vercel.app"

export const STYLIST_NAME = "Mikkies"
export const STYLIST_EMAIL = "hello@mikkieshair.com"
export const STYLIST_PHONE = "+1 (555) 123-4567"

export const BUSINESS_HOURS = {
  start: 9,
  end: 19,
  interval: 30,
} as const

export const APPOINTMENT_STATUS = {
  PENDING: "pending",
  PENDING_CONSULTATION: "pending_consultation",
  CONSULTATION_IN_PROGRESS: "consultation_in_progress",
  CONFIRMED: "confirmed",
  DECLINED: "declined",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
} as const

export const DECLINE_REASONS = [
  "Scheduling Conflict",
  "Customer Cancelled",
  "Price Not Accepted",
  "Service Unavailable",
  "Other",
] as const

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const

export const DASHBOARD_LINKS = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Appointments", href: "/dashboard/appointments", icon: "CalendarCheck" },
  { label: "Calendar", href: "/dashboard/calendar", icon: "Calendar" },
  { label: "Admin", href: "/admin", icon: "Admin" },
  { label: "Settings", href: "/dashboard/settings", icon: "Settings" },
] as const

export const SERVICE_CATEGORIES = [
  "Braiding",
  "Dreadlocks",
  "Haircuts",
  "Retwist",
  "Coloring",
  "Barbering",
  "Styling",
  "Treatment",
] as const
