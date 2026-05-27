"use client"

import { useState } from "react"
import { Scissors, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

const galleryImages = [
  { title: "Box Braids", category: "Braiding", color: "from-purple-400 to-purple-600" },
  { title: "Dreadlock Retwist", category: "Dreadlocks", color: "from-purple-500 to-pink-500" },
  { title: "Haircut Style", category: "Haircuts", color: "from-pink-400 to-purple-500" },
  { title: "Full Color", category: "Coloring", color: "from-indigo-400 to-purple-600" },
  { title: "Barber Cut", category: "Barbering", color: "from-purple-600 to-pink-400" },
  { title: "Passion Twists", category: "Braiding", color: "from-pink-500 to-purple-700" },
  { title: "Cornrows", category: "Braiding", color: "from-purple-700 to-indigo-500" },
  { title: "Scalp Treatment", category: "Treatment", color: "from-indigo-400 to-purple-500" },
  { title: "Dreadlock Installation", category: "Dreadlocks", color: "from-purple-500 to-indigo-600" },
  { title: "Kids Haircut", category: "Haircuts", color: "from-purple-400 to-pink-400" },
  { title: "Bridal Style", category: "Styling", color: "from-pink-500 to-purple-600" },
  { title: "Hair Coloring", category: "Coloring", color: "from-indigo-500 to-purple-700" },
]

const categories = [
  "All",
  "Braiding",
  "Dreadlocks",
  "Haircuts",
  "Coloring",
  "Barbering",
  "Styling",
  "Treatment",
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [search, setSearch] = useState("")

  const filtered = galleryImages.filter((img) => {
    const matchCategory = activeCategory === "All" || img.category === activeCategory
    const matchSearch = img.title.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Our Gallery
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Browse through our portfolio of styles and transformations. Get
            inspired for your next look.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 sm:w-64"
            />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item) => (
            <div
              key={item.title}
              className={`group relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br ${item.color} transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
            >
              <div className="flex h-full items-center justify-center">
                <Scissors className="h-12 w-12 text-white/30" />
              </div>
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4">
                <div>
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="text-xs text-white/70">{item.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-16 text-center">
            <p className="text-muted-foreground">No results found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
