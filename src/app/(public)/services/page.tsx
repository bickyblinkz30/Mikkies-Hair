import { Clock, DollarSign, ArrowRight, Scissors } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

const services = [
  {
    name: "Box Braids",
    description:
      "Classic box braids with your choice of length and thickness. Includes wash and scalp treatment.",
    duration: "3 hours",
    price: "$150",
    category: "Braiding",
    gradient: "from-purple-400 to-purple-600",
  },
  {
    name: "Dreadlock Retwist",
    description:
      "Professional retwist for established dreadlocks. Palm roll or interlocking method.",
    duration: "1.5 hours",
    price: "$80",
    category: "Dreadlocks",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    name: "Dreadlock Installation",
    description:
      "Full head crochet or interlocking dreadlock installation. Includes consultation.",
    duration: "5 hours",
    price: "$250",
    category: "Dreadlocks",
    gradient: "from-purple-600 to-pink-400",
  },
  {
    name: "Haircut & Style",
    description:
      "Precision haircut with wash, condition, and blow-dry style.",
    duration: "1 hour",
    price: "$45",
    category: "Haircuts",
    gradient: "from-pink-400 to-purple-500",
  },
  {
    name: "Full Color",
    description:
      "Full head hair coloring with premium products. Includes gloss treatment.",
    duration: "2 hours",
    price: "$120",
    category: "Coloring",
    gradient: "from-indigo-400 to-purple-600",
  },
  {
    name: "Barber Cut",
    description:
      "Classic barber cut with hot towel finish, beard trim, and style.",
    duration: "45 min",
    price: "$35",
    category: "Barbering",
    gradient: "from-purple-700 to-indigo-500",
  },
  {
    name: "Cornrows",
    description:
      "Neat cornrow braiding with any pattern of your choice. Includes edge control.",
    duration: "2 hours",
    price: "$100",
    category: "Braiding",
    gradient: "from-pink-500 to-purple-700",
  },
  {
    name: "Passion Twists",
    description:
      "Trendy passion twist installation. Includes rubber band method.",
    duration: "3 hours",
    price: "$160",
    category: "Braiding",
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    name: "Scalp Treatment",
    description:
      "Deep cleansing scalp treatment with essential oils and massage.",
    duration: "45 min",
    price: "$40",
    category: "Treatment",
    gradient: "from-indigo-400 to-purple-500",
  },
]

export default function ServicesPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Our Services
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Premium beauty services tailored to your style. Every service
            includes professional care and attention to detail.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.name}
              className="group overflow-hidden border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div
                className={`bg-gradient-to-br ${service.gradient} flex aspect-[4/3] items-center justify-center`}
              >
                <Scissors className="h-16 w-16 text-white/50" />
              </div>
              <CardContent className="p-5">
                <div className="mb-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {service.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {service.duration}
                  </span>
                  <span className="flex items-center gap-1 text-lg font-bold text-primary">
                    <DollarSign className="h-5 w-5" />
                    {service.price}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="p-5 pt-0">
                <Link href="/booking" className="w-full">
                  <Button className="w-full gap-2">
                    Book Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
