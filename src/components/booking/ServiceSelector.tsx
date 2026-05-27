"use client"

import { useState } from "react"
import { Check, Clock, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Service } from "@/lib/types"

interface ServiceSelectorProps {
  services: Service[]
  selected: Service | null
  onSelect: (service: Service) => void
}

export function ServiceSelector({
  services,
  selected,
  onSelect,
}: ServiceSelectorProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {services.map((service) => (
        <button
          key={service.id}
          onClick={() => onSelect(service)}
          className={cn(
            "relative rounded-xl border-2 p-5 text-left transition-all duration-200 hover:shadow-md",
            selected?.id === service.id
              ? "border-primary bg-primary/5 shadow-sm"
              : "border-border bg-card hover:border-primary/50"
          )}
        >
          {selected?.id === service.id && (
            <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
              <Check className="h-3.5 w-3.5 text-white" />
            </div>
          )}
          <h3 className="font-semibold">{service.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {service.description}
          </p>
          <div className="mt-3 flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              {service.duration_minutes} min
            </span>
            <span className="flex items-center gap-1 font-semibold text-primary">
              <DollarSign className="h-3.5 w-3.5" />
              ${service.price}
            </span>
          </div>
        </button>
      ))}
    </div>
  )
}
