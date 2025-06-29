'use client'

import { useEffect, useState } from "react"

type BannerItem = {
  image: string
  title: string
  description?: string
}

type BannerProps = {
  banners: BannerItem[]
}

export default function Banner({ banners = [] }: BannerProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (banners.length <= 1) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [banners.length])

  return (
    <div className="relative w-full h-80 overflow-hidden shadow-lg">
      {banners.map((item, index) => (
        <div
          key={index}
          className={`
            absolute inset-0 transition-opacity duration-1000 ease-in-out 
            ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"}
          `}
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4">
            <h2 className="text-4xl md:text-6xl font-bold">
              {item.title}
            </h2>
            <p className="text-sm md:text-base mt-2 max-w-md">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}