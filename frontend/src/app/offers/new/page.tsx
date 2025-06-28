"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"

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
        router.push("/offers")
      }
    } catch (err) {
      console.error("Token inválido:", err)
      setError("Token inválido")
      router.push("/login")
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const token = localStorage.getItem("token")
    if (!token) {
      setError("No autenticado")
      return
    }

    try {
      const res = await fetch("http://localhost:4000/api/offers", {
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

      router.push("/offers")
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-8">
      <h2 className="text-xl font-bold mb-4">Crear nueva oferta</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Publicar oferta
        </button>
      </form>
    </div>
  )
}
