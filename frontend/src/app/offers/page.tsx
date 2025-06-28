"use client"

import EnergyOfferCard from "@/components/EnergyOfferCard"
import useSWR from "swr"

const fetcher = (url: string) =>
  fetch(url).then(res => {
    if (!res.ok) throw new Error("Error en la solicitud")
    return res.json()
  })

export default function OffersPage() {
  const { data, error, isLoading } = useSWR("http://localhost:4000/api/offers", fetcher)

  if (isLoading) return <p>Cargando ofertas...</p>
  if (error) return <p>Error al cargar ofertas</p>

  console.log(data)

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-3xl font-bold mb-4 border-b">Ofertas Activas</h1>
      <div className="flex flex-wrap justify-center gap-2">
        {data?.map((offer: any, index: number) => (
          <EnergyOfferCard offer={offer} key={index} />
        ))}
      </div>
    </div>
  )
}