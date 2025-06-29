"use client"

import ErrorMessage from "@/components/Commons/ErrorMessage"
import Loader from "@/components/Commons/loader"
import EnergyOfferCard from "@/components/EnergyOfferCard"
import useSWR from "swr"

const fetcher = (url: string) =>
  fetch(url).then(res => {
    if (!res.ok) throw new Error("Error en la solicitud")
    return res.json()
  })

export default function OffersPage() {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/offers`, 
    fetcher,
    {
      refreshInterval: 60000,
      revalidateOnFocus: true,
      revalidateIfStale: true
    }
  )

  console.log(data)

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold mb-4 border-b">Ofertas Activas</h1>

      {
        isLoading && 
        <div className="pt-12">
          <Loader size={96} />
        </div>
      }
      {
        error && <ErrorMessage message="Error al cargar las ofertas" />
      }

      <div className="flex flex-wrap w-full gap-4">
        {data?.map((offer: any, index: number) => (
          <EnergyOfferCard 
            offer={offer} 
            key={index} 
          />
        ))}
      </div>
    </div>
  )
}