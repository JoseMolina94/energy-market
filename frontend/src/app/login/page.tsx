"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    console.log({ email, password })

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Error al iniciar sesión")

      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      router.push("/offers")
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded md:shadow">

      <h2 className="text-xl font-bold mb-4">Iniciar sesión</h2>

      {
        error && 
          <p className="text-red-600 mb-2">{error}</p>
      }
      
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block font-semibold">Correo electrónico</label>
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full border px-2 py-1 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full border px-2 py-1 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Entrar
        </button>
      </form>

      <div className="mt-8 w-full text-center" >
        <Link href='/register'>
          <span className="underline text-blue-500 cursor-pointer text-sm" >
            ¿No tienes cuenta?, puedes crear una aquí
          </span>
        </Link>
      </div>
    </div>
  )
}
