"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"
import Modal from "@/components/Commons/Modal"

interface DecodedToken {
  userId: string
  role: string
  exp: number
}

export default function CreateOfferPage() {
  const router = useRouter()
  const [kWh, setKWh] = useState(100)
  const [price, setPrice] = useState(0.2)
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [error, setError] = useState("")
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const createOffer = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      setError("No autenticado")
      return
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/offers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          kWh,
          pricePerKWh: price,
          availableFrom: new Date(from).toISOString(),
          availableTo: new Date(to).toISOString(),
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || "Error al crear oferta")
      }

      router.push("/")
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    setShowConfirmModal(true)
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      setError("Debes iniciar sesión")
      router.push("/login")
      return
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token)
      if (decoded.role !== "seller") {
        setError("Solo los vendedores pueden crear ofertas")
        router.push("/")
      }
    } catch (err) {
      console.error("Token inválido:", err)
      setError("Token inválido")
      router.push("/login")
    }
  }, [])

  return (
    <div className="px-4 py-4 md:px-8">
      <h2 className="text-3xl font-bold mb-4 border-b">Crear nueva oferta</h2>

      <div className="max-w-md mx-auto bg-white p-4 rounded">

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block font-semibold">Cantidad (kWh)</label>
            <input
              type="number"
              value={kWh}
              onChange={(e) => setKWh(Number(e.target.value))}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Precio por kWh ($)</label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Desde</label>
            <input
              type="datetime-local"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Hasta</label>
            <input
              type="datetime-local"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>

          <div className="mt-8 flex gap-4">
            <button
              type="button"
              onClick={() => setShowCancelModal(true)}
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Publicar oferta
            </button>
          </div>
        </form>
      </div>

      <Modal
        isOpen={showCancelModal}
        setIsOpen={setShowCancelModal}
        message="¿Seguro que quieres cancelar?"
        confirm={() => router.push("/")}
        confirmButtonText="Si, cancelar"
        cancelButtonText="No"
      />

      <Modal
        isOpen={showConfirmModal}
        setIsOpen={setShowConfirmModal}
        message={
          <div className="mb-6" >
            <h3>¿Seguro que quieres crear esta oferta?</h3>
            <p>Al crearla no podras editarla.</p>
            <div className="text-sm flex flex-col gap-4">
              <div className="text-xl font-semibold" >{kWh} kWh</div>
              <div className="text-lg">
                <strong>Costo: </strong> 
                $ {price}/kWh
              </div>
              <div>
                <div>
                  <strong>Desde: </strong>
                  {new Date(from).toLocaleString()}
                </div>
                <div>
                  <strong>Hasta: </strong>
                  {new Date(to).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        }
        confirm={createOffer}
        confirmButtonText="Confirmar creación"
        cancelButtonText="Cancelar"
      />
    </div>
  )
}
