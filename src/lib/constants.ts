export const SITE_NAME = "StyleSlot"
export const SITE_DESCRIPTION = "Premium beauty & salon booking platform"
export const SITE_URL = "https://styleslot.vercel.app"

export const STYLIST_NAME = "StyleSlot Stylist"
export const STYLIST_EMAIL = "stylist@styleslot.com"
export const STYLIST_PHONE = "+1 (555) 123-4567"

export const BUSINESS_HOURS = {
  start: 9,
  end: 19,
  interval: 30,
} as const

export const APPOINTMENT_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  DECLINED: "declined",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
} as const

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Book Now", href: "/booking" },
  { label: "Contact", href: "/contact" },
] as const

export const DASHBOARD_LINKS = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Appointments", href: "/dashboard/appointments", icon: "CalendarCheck" },
  { label: "Calendar", href: "/dashboard/calendar", icon: "Calendar" },
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
