"use client"

import { Scissors } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const galleryItems = [
  { color: "from-purple-400 to-purple-600", label: "Braiding" },
  { color: "from-pink-400 to-purple-500", label: "Dreadlocks" },
  { color: "from-indigo-400 to-purple-600", label: "Haircuts" },
  { color: "from-purple-500 to-pink-500", label: "Color" },
  { color: "from-purple-600 to-pink-400", label: "Barber" },
  { color: "from-purple-700 to-indigo-500", label: "Styling" },
]

export function GallerySection() {
  return (
    <section className="bg-muted/50 py-20" id="gallery">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Our Gallery
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Browse through our portfolio of styles and transformations.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {galleryItems.map((item) => (
            <div
              key={item.label}
              className={`group relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br ${item.color} transition-transform duration-300 hover:scale-[1.02]`}
            >
              <div className="flex h-full items-center justify-center">
                <Scissors className="h-12 w-12 text-white/30" />
              </div>
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-sm font-medium text-white">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/gallery">
            <Button variant="outline" size="lg">
              View Full Gallery
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
