"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Scissors } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const galleryItems = [
  { title: "Box Braids", category: "Braiding", gradient: "from-purple-400 to-purple-600" },
  { title: "Dreadlock Retwist", category: "Dreadlocks", gradient: "from-purple-500 to-pink-500" },
  { title: "Precision Haircut", category: "Haircuts", gradient: "from-pink-400 to-purple-500" },
  { title: "Balayage Color", category: "Coloring", gradient: "from-indigo-400 to-purple-600" },
  { title: "Silk Press Style", category: "Styling", gradient: "from-amber-400 to-yellow-600" },
  { title: "Passion Twists", category: "Braiding", gradient: "from-pink-500 to-purple-700" },
  { title: "Cornrows", category: "Braiding", gradient: "from-purple-700 to-indigo-500" },
  { title: "Dreadlock Installation", category: "Dreadlocks", gradient: "from-purple-500 to-indigo-600" },
  { title: "Modern Crop", category: "Haircuts", gradient: "from-purple-400 to-pink-400" },
  { title: "Bridal Updo", category: "Styling", gradient: "from-pink-500 to-purple-600" },
  { title: "Full Color Service", category: "Coloring", gradient: "from-indigo-500 to-purple-700" },
  { title: "Formal Waves", category: "Styling", gradient: "from-amber-500 to-yellow-700" },
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
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h1 className="font-serif text-4xl font-bold tracking-tight text-[#D4AF37] sm:text-5xl">
            Our Gallery
          </h1>
          <p className="mt-4 text-lg text-[#888888]">
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
                    ? "bg-[#D4AF37] text-black"
                    : "bg-[#111111] text-[#888888] hover:bg-[#1a1a1a] hover:text-[#F5F5F5]"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#888888]" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border-[#1f1f1f] bg-[#111111] pl-9 text-[#F5F5F5] placeholder:text-[#888888] focus-visible:ring-[#D4AF37] sm:w-64"
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
                      "group relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br transition-all duration-300 hover:scale-[1.03] hover:border hover:border-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.2)]",
                      item.gradient
                    )}
                  >
                    <div className="flex h-full items-center justify-center">
                      <Scissors className="h-12 w-12 text-white/20 transition-transform duration-300 group-hover:scale-110 group-hover:text-white/40" />
                    </div>
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4">
                      <div>
                        <p className="text-sm font-medium text-white">{item.title}</p>
                        <p className="text-xs text-white/60">{item.category}</p>
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
                <p className="text-[#888888]">No results found.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
