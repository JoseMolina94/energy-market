"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import UserAvatar from "../UserAvatar"
import UserMenu from "../UserMenu"
import { User } from "@/types/User"

export default function Header() {
  const [user, setUser] = useState<User | null>(null)
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  const getUserLogged = (token: string | null) => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Token inválido o expirado")
        const data = await res.json()
        setUser(data.user)
      })
      .catch((err) => {
        console.error("Error al cargar usuario:", err.message)
        setUser(null)
      })
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setUser(null)
    setShowMenu(false)
    router.push("/login")
  }

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) return
    if (!user) getUserLogged(token)

  }, [pathname])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="w-full bg-gray-100 py-4 px-6 shadow mb-6 relative">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-4xl font-bold">⚡ Energy Market</h1>

        {user && (
          <div ref={menuRef} className="relative">
            <div
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            >
              <div className="text-sm text-gray-700 text-right">
                <p>
                  Bienvenid@, 
                  <span className="font-medium capitalize"> {user.name} </span>
                </p>
                <span className="text-xs text-slate-500">{user.email}</span>
              </div>
              <UserAvatar classname="w-11 h-11 border border-slate-400 bg-slate-300" />
            </div>

            {showMenu && (
              <UserMenu 
                user={user}
                handleLogout={handleLogout} 
              />
            )}
          </div>
        )}
      </div>
    </header>
  )
}
