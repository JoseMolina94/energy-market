'use client'

import Banner from "@/components/Commons/Banner"
import ErrorMessage from "@/components/Commons/ErrorMessage"
import Loader from "@/components/Commons/loader"
import EnergyOfferCard from "@/components/EnergyOfferCard"
import useSWR from "swr"

import styles from './styles.module.css'

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

  const banners = [
    {
      image: '/images/e_banner_1.webp',
      title: 'Un mercado energetico para tí.',
      description: 'Descubre nuevas ofertas de energía cada día.'
    },
    {
      image: '/images/e_banner_2.webp',
      title: 'Mira al futuro.',
      description: 'Con nuevas formas de generar energía para tí y los tuyos.'
    },
    {
      image: '/images/e_banner_3.webp',
      title: 'Cuída el planeta',
      description: 'Con energías limpias y renovables.'
    }
  ]

  return (
    <div className="space-y-6">
      <Banner banners={banners} />

      <div className="px-4 md:px-8">
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

        <div 
          className={styles.offersGrid}
        >
          {data?.map((offer: any, index: number) => (
            <EnergyOfferCard
              offer={offer}
              key={index}
            />
          ))}
        </div>

      </div>

    </div>
  )
}