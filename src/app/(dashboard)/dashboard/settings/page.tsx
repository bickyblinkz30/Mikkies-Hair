"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { STYLIST_NAME, STYLIST_EMAIL, STYLIST_PHONE, BUSINESS_HOURS } from "@/lib/constants"
import { Save, Clock, Bell, CreditCard, User } from "lucide-react"

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: STYLIST_NAME,
    email: STYLIST_EMAIL,
    phone: STYLIST_PHONE,
    salonName: "StyleSlot Studio",
    address: "123 Beauty Avenue, Suite 100, New York, NY 10001",
  })

  const [hours, setHours] = useState({
    start: BUSINESS_HOURS.start.toString(),
    end: BUSINESS_HOURS.end.toString(),
    interval: BUSINESS_HOURS.interval.toString(),
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    bookingReminders: true,
    smsNotifications: false,
    reminderTime: "24",
  })

  const [saving, setSaving] = useState(false)

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await new Promise((r) => setTimeout(r, 800))
    toast.success("Profile updated successfully")
    setSaving(false)
  }

  async function handleSaveHours(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await new Promise((r) => setTimeout(r, 800))
    toast.success("Business hours updated")
    setSaving(false)
  }

  async function handleSaveNotifications(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await new Promise((r) => setTimeout(r, 800))
    toast.success("Notification preferences updated")
    setSaving(false)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your profile, business hours, and preferences.
        </p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="hours" className="gap-2">
            <Clock className="h-4 w-4" />
            Business Hours
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="payments" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Payments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your salon and personal details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salon">Salon Name</Label>
                    <Input
                      id="salon"
                      value={profile.salonName}
                      onChange={(e) => setProfile({ ...profile, salonName: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  />
                </div>
                <Button type="submit" disabled={saving} className="gap-2">
                  <Save className="h-4 w-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hours" className="mt-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
              <CardDescription>
                Set your working hours and booking interval.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveHours} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="start">Opening Time</Label>
                    <Input
                      id="start"
                      type="time"
                      value={`${hours.start.padStart(2, "0")}:00`}
                      onChange={(e) => setHours({ ...hours, start: e.target.value.split(":")[0] })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end">Closing Time</Label>
                    <Input
                      id="end"
                      type="time"
                      value={`${hours.end.padStart(2, "0")}:00`}
                      onChange={(e) => setHours({ ...hours, end: e.target.value.split(":")[0] })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interval">Booking Interval (min)</Label>
                    <select
                      id="interval"
                      value={hours.interval}
                      onChange={(e) => setHours({ ...hours, interval: e.target.value })}
                      className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">60 minutes</option>
                    </select>
                  </div>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm font-medium">Working Days</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Monday - Saturday (Sunday closed)
                  </p>
                </div>
                <Button type="submit" disabled={saving} className="gap-2">
                  <Save className="h-4 w-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how you receive booking alerts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveNotifications} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive email alerts for new bookings
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailNotifications}
                      onCheckedChange={(v) =>
                        setNotifications({ ...notifications, emailNotifications: v })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="font-medium">Booking Reminders</p>
                      <p className="text-sm text-muted-foreground">
                        Send reminders to clients before appointments
                      </p>
                    </div>
                    <Switch
                      checked={notifications.bookingReminders}
                      onCheckedChange={(v) =>
                        setNotifications({ ...notifications, bookingReminders: v })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive SMS alerts (coming soon)
                      </p>
                    </div>
                    <Switch
                      checked={notifications.smsNotifications}
                      onCheckedChange={(v) =>
                        setNotifications({ ...notifications, smsNotifications: v })
                      }
                      disabled
                    />
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="reminderTime">Reminder Timing</Label>
                  <select
                    id="reminderTime"
                    value={notifications.reminderTime}
                    onChange={(e) =>
                      setNotifications({ ...notifications, reminderTime: e.target.value })
                    }
                    className="flex h-10 w-full max-w-xs rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="1">1 hour before</option>
                    <option value="2">2 hours before</option>
                    <option value="4">4 hours before</option>
                    <option value="24">24 hours before</option>
                    <option value="48">48 hours before</option>
                  </select>
                </div>
                <Button type="submit" disabled={saving} className="gap-2">
                  <Save className="h-4 w-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="mt-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>
                Configure your payment methods and pricing.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
                <p className="font-medium text-green-800 dark:text-green-200">
                  Current: Cash on Appointment
                </p>
                <p className="mt-1 text-sm text-green-600 dark:text-green-300">
                  Clients pay in cash at the time of their appointment.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Future Payment Methods
                </h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {[
                    { name: "PayPal", description: "Online payment via PayPal" },
                    { name: "Flutterwave", description: "African payment gateway" },
                    { name: "Paystack", description: "Nigeria payment gateway" },
                    { name: "Bank Transfer", description: "Direct bank deposit" },
                  ].map((method) => (
                    <div
                      key={method.name}
                      className="rounded-lg border border-dashed border-muted-foreground/30 p-4 opacity-60"
                    >
                      <p className="font-medium">{method.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {method.description}
                      </p>
                      <span className="mt-1 inline-block rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                        Coming Soon
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
