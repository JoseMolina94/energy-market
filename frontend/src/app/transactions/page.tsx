'use client'

import useSWR from "swr"
import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Transaction, DecodedToken } from "@/types/Transaction"
import Loader from "@/components/Commons/loader"
import ErrorMessage from "@/components/Commons/ErrorMessage"

const fetcherWithToken = (url: string, token: string) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(async (res) => {
    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.message || "Error al obtener transacciones")
    }
    return res.json()
  })

export default function TransactionsPage() {
  const [token, setToken] = useState<string | null>(null)
  const [role, setRole] = useState<"buyer" | "seller" | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (!storedToken) {
      router.push("/login")
      return
    }

    try {
      const decoded = jwtDecode<DecodedToken>(storedToken)
      setToken(storedToken)
      setRole(decoded.role)
    } catch (err) {
      console.error("Token inválido", err)
      router.push("/login")
    }
  }, [router])

  const { data, error, isLoading } = useSWR(
    token ? [`${process.env.NEXT_PUBLIC_BACKEND_API}/transactions`, token] : null,
    ([url, token]) => fetcherWithToken(url, token),
    {
      refreshInterval: 60000,
      revalidateOnFocus: true,
      revalidateIfStale: true
    }
  )

  const transactions = data as Transaction[] || []

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 border-b">
        Historial de transacciones: ({role === "seller" ? "Tus ventas realizadas" : "Tus compras"})
      </h2>

      <div className="p-4 max-w-3xl mx-auto">

        {
          isLoading && (
            <div className="pt-12">
              <Loader size={96} />
            </div>
          )
        }

        {
          error && <ErrorMessage message={error.message} />
        }

        {transactions.length === 0 && !isLoading && (
          <p className="text-gray-500 mt-6">No se encontraron transacciones.</p>
        )}

        <div className="space-y-4">
          {transactions.map((tx) => (
            <div key={tx._id} className="bg-white rounded shadow p-4">
              <p><strong>kWh:</strong> {tx.kWh}</p>
              <p><strong>Precio por kWh:</strong> ${tx.pricePerKWh.toFixed(2)}</p>
              <p><strong>Total:</strong> ${tx.totalPrice.toFixed(2)}</p>
              <p className="text-sm text-gray-500">
                <strong>Fecha de compra:</strong> {new Date(tx.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
