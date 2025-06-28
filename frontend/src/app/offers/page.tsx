"use client";

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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Ofertas activas</h1>
      <ul className="space-y-4">
        {data?.map((offer: any) => (
          <li key={offer._id} className="p-4 bg-white shadow rounded">
            <p><strong>kWh:</strong> {offer.kWh}</p>
            <p><strong>Precio:</strong> ${offer.pricePerKWh}/kWh</p>
            <p><strong>Desde:</strong> {new Date(offer.availableFrom).toLocaleString()}</p>
            <p><strong>Hasta:</strong> {new Date(offer.availableTo).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}