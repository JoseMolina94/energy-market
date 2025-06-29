"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import UserAvatar from "../UserAvatar"
import UserMenu from "../UserMenu"
import { User } from "@/types/User"
import Link from "next/link"

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
    <header className="w-full bg-gray-100 py-4 px-2 md:px-0 shadow relative">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link href={'/'}>
          <h1 className="text-2xl md:text-4xl font-bold cursor-pointer shrink-0">⚡Energy Market</h1>
        </Link>
        
        {
          user ? (
            <div ref={menuRef} className="relative">
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => setShowMenu(!showMenu)}
              >
                <div className="text-sm hidden md:block text-gray-700 text-right">
                  <p>
                    Bienvenid@, 
                    <span className="font-medium capitalize"> {user.name} </span>
                  </p>
                  <span className="text-xs text-slate-500">{user.email}</span>
                </div>
                <UserAvatar />
              </div>

              {showMenu && (
                <UserMenu 
                  user={user}
                  handleLogout={handleLogout} 
                />
              )}
            </div>
          ) : (
            <Link href='/login'>
              <div 
                className="cursor-pointer hidden md:block border px-3 py-1 rounded-full border-slate-400 bg-slate-300 hover:bg-slate-400 transition"
              >
                Iniciar Sesión
              </div>

              <div className="cursor-pointer text-xs md:hidden block border px-3 py-1 rounded-full border-slate-400 bg-slate-300 hover:bg-slate-400 transition">
                Sesión
              </div>
            </Link>
          )
        }
      </div>
    </header>
  )
}
