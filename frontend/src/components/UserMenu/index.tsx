import { User } from "@/types/User"
import Link from "next/link"

type UserMenuProps = {
  handleLogout?: () => void
  user?: User
}

type TMenuItem = {
  label: string,
  href: string,
  condition?: (userRole: string) => boolean
}

export default function UserMenu (props : UserMenuProps) {
  const {
    handleLogout,
    user = null
  } = props

  const menu: TMenuItem[] = [
    {
      label: 'Ofertas',
      href: '/offers',
    },
    {
      label: 'Crear nueva oferta',
      href: '/offers/new',
      condition: (userRole: string) => userRole === 'seller'
    },
    {
      label: 'Historial de transacciones',
      href: '/transactions-history'
    }
  ]

  const getUserMenu = () => {
    return menu.filter((menuItem: TMenuItem) => {
      if (menuItem?.condition) {
        if (menuItem?.condition(user?.role as string)) {
          return menuItem
        }

        return
      }

      return menuItem
    })
  }

  return (
    <div className="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded border z-50">
      {
        getUserMenu().map((menuItem: TMenuItem, index: number) => (
          <Link 
            key={`user-menu-item-${index}`} 
            href={menuItem.href} 
          >
            <div
              className="w-full cursor-pointer text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              {menuItem.label}
            </div>
          </Link>
        ))
      }

      {
        handleLogout &&
          <button
            onClick={handleLogout}
            className="w-full text-left text-red-600 px-4 py-2 text-sm hover:bg-gray-100"
          >
            Cerrar sesión
          </button>
      }
    </div>
  )
}