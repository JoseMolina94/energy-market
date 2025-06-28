'use client'

import { useState } from "react"

type UserAvatarProps = {
  classname?: string
}

export default function UserAvatar ({ classname = '' } : UserAvatarProps) {

  const [avatar] = useState<string>(`${process.env.NEXT_PUBLIC_RANDOM_AVATAR_API}=${Math.random()}`)

  return (
    <div>
      <img
        src={avatar}
        alt='avatar-user'
        className={`w-16 h-16 rounded-full ${classname} `}
      />
    </div>
  )
}