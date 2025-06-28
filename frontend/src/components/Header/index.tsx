"use client";

import { useEffect, useState } from "react";
import UserAvatar from "../UserAvatar";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function Header() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Token inválido o expirado");
        const data = await res.json();
        setUser(data.user);
      })
      .catch((err) => {
        console.error("Error al cargar usuario:", err.message);
        setUser(null); // Token inválido o expirado
      });
  }, []);

  return (
    <header className="w-full bg-gray-100 py-4 px-6 shadow mb-6">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-4xl font-bold">⚡ Energy Market</h1>
        {user && (
          <div className="flex gap-2 items-center">
            <p className="text-sm text-gray-700 text-right">
              Bienvenid@, 
              <strong className="capitalize">
                {user.name}
              </strong>
              <br />
              <span className="text-xs text-slate-500">
                {user.email}
              </span>
            </p>
            <UserAvatar classname='w-12 h-12 border border-slate-400 bg-slate-300' />
          </div>
        )}
      </div>
    </header>
  );
}
