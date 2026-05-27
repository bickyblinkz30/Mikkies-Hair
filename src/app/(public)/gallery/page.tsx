"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Scissors } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const galleryItems = [
  { title: "Box Braids", category: "Braiding" },
  { title: "Dreadlock Retwist", category: "Dreadlocks" },
  { title: "Precision Haircut", category: "Haircuts" },
  { title: "Balayage Color", category: "Coloring" },
  { title: "Silk Press Style", category: "Styling" },
  { title: "Passion Twists", category: "Braiding" },
  { title: "Cornrows", category: "Braiding" },
  { title: "Dreadlock Installation", category: "Dreadlocks" },
  { title: "Modern Crop", category: "Haircuts" },
  { title: "Bridal Updo", category: "Styling" },
  { title: "Full Color Service", category: "Coloring" },
  { title: "Formal Waves", category: "Styling" },
]

const categories = ["All", "Braiding", "Dreadlocks", "Haircuts", "Coloring", "Styling"]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [search, setSearch] = useState("")

  const filtered = galleryItems.filter((item) => {
    const matchCategory = activeCategory === "All" || item.category === activeCategory
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <div className="py-16 sm:py-24 relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h1 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Our Gallery
          </h1>
          <div className="mt-4 text-[#C9A84C] text-xl opacity-70">◇</div>
          <p className="mt-4 text-lg text-white/50">
            Browse through our portfolio of transformations
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
                    activeCategory === cat
                      ? "bg-[#C9A84C]/20 text-[#C9A84C] border border-[#C9A84C]/40"
                      : "bg-[#111] text-white/50 hover:bg-[#1a1a1a] hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-white/10 bg-[#111] pl-9 text-white placeholder:text-white/30 focus-visible:ring-[#C9A84C] sm:w-64"
            />
          </div>
        </motion.div>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={activeCategory + search}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
              >
                {filtered.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={cn(
                      "group relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-[#111] border border-white/10 transition-all duration-300 hover:scale-[1.03] hover:border-[#C9A84C]/50 hover:shadow-[0_0_25px_rgba(201,168,76,0.15)]"
                    )}
                  >
                    <div className="flex h-full items-center justify-center">
                      <Scissors className="h-12 w-12 text-white/10 transition-transform duration-300 group-hover:scale-110 group-hover:text-white/30" />
                    </div>
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4">
                      <div>
                        <p className="text-sm font-medium text-white">{item.title}</p>
                        <p className="text-xs text-white/50">{item.category}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-16 text-center"
              >
                <p className="text-white/50">No results found.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
