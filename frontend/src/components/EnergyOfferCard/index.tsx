"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"
import { Offer } from "@/types/Offer"
import { mutate } from 'swr'
import Modal from "../Commons/Modal"

type EnergyOfferCardProps = {
  offer: Offer
}

interface DecodedToken {
  userId: string
  role: string
  exp: number
}

export default function EnergyOfferCard({ offer }: EnergyOfferCardProps) {
  const [isBuyer, setIsBuyer] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return

    try {
      const decoded = jwtDecode<DecodedToken>(token)
      if (decoded.role === "buyer") {
        setIsBuyer(true)
      }
    } catch {
      setIsBuyer(false)
    }
  }, [])

  const handleBuy = async () => {
    setError("")

    const token = localStorage.getItem("token")
    if (!token) {
      setError("Debes iniciar sesión.")
      return
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/transactions/${offer._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ offerId: offer._id }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || "Error al comprar oferta")
      }

      mutate(`${process.env.NEXT_PUBLIC_BACKEND_API}/offers`)
      setTimeout(() => router.refresh(), 1000)
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="flex flex-col items-center w-54 max-w-54 p-4 bg-white shadow rounded space-y-2">
      <div className="text-center block border rounded-md w-fit p-2">
        <span className="text-6xl">⚡</span> 
        <p className="font-semibold text-lg">{offer.kWh} kWh</p>
      </div>

      <p className="text-center text-xl font-bold">
        $ {offer.pricePerKWh}/kWh
      </p>

      <div>
        <p className="text-xs">
          <strong>Desde: </strong> 
          {new Date(offer.availableFrom).toLocaleString()}
        </p>
        <p className="text-xs">
          <strong>Hasta: </strong> 
          {new Date(offer.availableTo).toLocaleString()}
        </p>
      </div>

      {isBuyer && (
        <button
          onClick={() => setOpenModal(true)}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Comprar
        </button>
      )}

      {error && <p className="text-sm text-red-600 text-center">{error}</p>}

      <Modal
        message={
          <div className="mb-6" >
            <h3>¿Seguro que quieres comprar esta oferta?</h3>
            <div className="text-sm flex flex-col gap-4">
              <div className="text-xl font-semibold" >{offer.kWh} kWh</div>
              <div className="text-lg">
                <strong>Costo: </strong> 
                $ {offer.pricePerKWh}/kWh
              </div>
              <div>
                <div>
                  <strong>Desde: </strong>
                  {new Date(offer.availableFrom).toLocaleString()}
                </div>
                <div>
                  <strong>Hasta: </strong>
                  {new Date(offer.availableTo).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        }
        isOpen={openModal}
        setIsOpen={setOpenModal}
        confirm={handleBuy}
      />
    </div>
  )
}
