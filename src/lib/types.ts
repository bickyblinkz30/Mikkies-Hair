export type Service = {
  id: string
  name: string
  description: string
  duration_minutes: number
  price: number
  image_url: string
  category: string
  active: boolean
  created_at: string
}

export type Appointment = {
  id: string
  client_name: string
  client_email: string
  client_phone: string
  service_id: string
  service?: Service
  date: string
  time: string
  status: "pending" | "confirmed" | "declined" | "cancelled" | "completed"
  notes?: string
  created_at: string
  updated_at: string
}

export type Availability = {
  id: string
  date: string
  start_time: string
  end_time: string
  is_blocked: boolean
  created_at: string
}

export type Profile = {
  id: string
  user_id: string
  role: "client" | "stylist" | "admin"
  full_name: string
  email: string
  phone?: string
  avatar_url?: string
  created_at: string
}

export type Notification = {
  id: string
  user_id: string
  type: "booking_confirmed" | "booking_pending" | "booking_declined" | "reminder"
  title: string
  message: string
  read: boolean
  created_at: string
}
