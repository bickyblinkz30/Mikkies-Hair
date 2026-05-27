"use client"

import { motion } from "framer-motion"
import { Check, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Service } from "@/lib/types"

interface ServiceSelectorProps {
  services: Service[]
  selected: Service | null
  onSelect: (service: Service) => void
}

export function ServiceSelector({ services, selected, onSelect }: ServiceSelectorProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {services.map((service) => {
        const isSelected = selected?.id === service.id
        return (
          <motion.button
            key={service.id}
            layout
            onClick={() => onSelect(service)}
            className={cn(
              "group relative rounded-xl border p-5 text-left transition-all duration-200",
              isSelected
                ? "border-[#D4AF37] bg-[#D4AF37]/5 shadow-[0_0_20px_-5px_rgba(212,175,55,0.15)]"
                : "border-white/5 bg-[#0a0a0a] hover:border-[#D4AF37]/40 hover:shadow-[0_0_20px_-5px_rgba(212,175,55,0.08)]"
            )}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#D4AF37]"
              >
                <Check className="h-3.5 w-3.5 text-black" />
              </motion.div>
            )}
            <h3 className="font-serif text-lg font-semibold text-[#F5F5F5]">
              {service.name}
            </h3>
            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[#888]">
              {service.description}
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-sm text-[#666]">
              <Clock className="h-3.5 w-3.5" />
              <span>{service.duration_minutes} min</span>
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}
