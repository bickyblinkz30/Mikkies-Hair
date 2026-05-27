"use client"

import Link from "next/link"
import {
  ArrowRight,
  Clock,
  DollarSign,
  Scissors,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

const services = [
  {
    name: "Box Braids",
    duration: "180 min",
    price: "$150",
    image: "bg-gradient-to-br from-purple-400 to-purple-600",
    icon: Scissors,
  },
  {
    name: "Dreadlock Retwist",
    duration: "90 min",
    price: "$80",
    image: "bg-gradient-to-br from-purple-500 to-pink-500",
    icon: Scissors,
  },
  {
    name: "Haircut & Style",
    duration: "60 min",
    price: "$45",
    image: "bg-gradient-to-br from-pink-400 to-purple-500",
    icon: Scissors,
  },
  {
    name: "Barber Cut",
    duration: "45 min",
    price: "$35",
    image: "bg-gradient-to-br from-indigo-400 to-purple-600",
    icon: Scissors,
  },
  {
    name: "Full Color",
    duration: "120 min",
    price: "$120",
    image: "bg-gradient-to-br from-purple-600 to-pink-400",
    icon: Scissors,
  },
  {
    name: "Passion Twists",
    duration: "180 min",
    price: "$160",
    image: "bg-gradient-to-br from-pink-500 to-purple-700",
    icon: Scissors,
  },
]

export function ServicesSection() {
  return (
    <section className="py-20" id="services">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Our Premium Services
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From braiding to barbering, we offer a full range of professional
            beauty services tailored to you.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.name}
              className="group overflow-hidden border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div
                className={`${service.image} flex aspect-[4/3] items-center justify-center`}
              >
                <service.icon className="h-16 w-16 text-white/50" />
              </div>
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {service.duration}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-primary">
                    <DollarSign className="h-4 w-4" />
                    {service.price}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="p-5 pt-0">
                <Link href="/booking" className="w-full">
                  <Button variant="outline" className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground">
                    Book Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/services">
            <Button variant="outline" size="lg" className="gap-2">
              View All Services
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
