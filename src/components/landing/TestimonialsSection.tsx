"use client"

import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Braiding Client",
    content:
      "StyleSlot made booking my braiding appointment so easy. No more waiting for WhatsApp replies! The stylist was amazing and my box braids look incredible.",
    rating: 5,
    initials: "SJ",
  },
  {
    name: "Michael T.",
    role: "Barber Client",
    content:
      "Found my new go-to barber through StyleSlot. The booking system is seamless and I love being able to see available time slots instantly.",
    rating: 5,
    initials: "MT",
  },
  {
    name: "Emily Rodriguez",
    role: "Dreadlock Client",
    content:
      "The retwist service was top-notch. I appreciate how professional the whole experience was, from booking to the actual appointment.",
    rating: 5,
    initials: "ER",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Real reviews from real clients who love their StyleSlot experience.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="border-0 bg-muted/30 shadow-sm">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/30" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {testimonial.content}
                </p>
                <div className="mt-4 flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
