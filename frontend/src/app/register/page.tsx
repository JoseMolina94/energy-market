"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message || "Error en el registro");
        setLoading(false);
        return;
      }

      alert("¡Registro realizado con éxito!")
      router.push("/login");
    } catch (err) {
      console.error(err);
      setError("Error en la conexión con el servidor");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 md:shadow rounded-xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Registro</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          className="w-full border px-2 py-1 rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          className="w-full border px-2 py-1 rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="w-full border px-2 py-1 rounded"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <select
          name="role"
          className="w-full border px-2 py-1 rounded"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="buyer">Comprador</option>
          <option value="seller">Vendedor</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>

        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
      </form>

      <div className="mt-8 w-full text-center" >
        <Link href='/login'>
          <span className="underline text-blue-500 cursor-pointer text-sm" >
            ¿Ya tienes cuenta?, inicia sesión aquí
          </span>
        </Link>
      </div>
    </div>
  );
}
