"use client";

import EnergyOfferCard from "@/components/EnergyOfferCard";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url).then(res => {
    if (!res.ok) throw new Error("Error en la solicitud");
    return res.json();
  });

export default function OffersPage() {
  const { data, error, isLoading } = useSWR("http://localhost:4000/api/offers", fetcher);

  if (isLoading) return <p>Cargando ofertas...</p>;
  if (error) return <p>Error al cargar ofertas</p>;

  console.log(data)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Ofertas activas</h1>
      <div className="flex gap-2">
        {data?.map((offer: any, index: number) => (
          <EnergyOfferCard offer={offer} key={index} />
        ))}
      </div>
    </div>
  );
}