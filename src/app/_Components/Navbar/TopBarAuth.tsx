"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { FaUser, FaUserPlus } from "react-icons/fa"
import { RiLogoutCircleLine } from "react-icons/ri"

export default function TopBarAuth() {
  const { data: session, status } = useSession()

  if (status === "loading") return null

  if (status === "authenticated") {
    return (
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5 text-gray-300">
          <FaUser className="size-3" />
          <span>{session.user?.name}</span>
        </span>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-1.5 text-gray-300 hover:text-red-400 transition-colors"
        >
          <RiLogoutCircleLine />
          <span>Sign Out</span>
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <Link href="/login" className="flex items-center gap-1.5 text-gray-300 hover:text-stone-200 transition-colors">
        <FaUser className="size-3" />
        <span>Sign In</span>
      </Link>
      <Link href="/register" className="flex items-center gap-1.5 text-gray-300 hover:text-stone-200 transition-colors">
        <FaUserPlus />
        <span>Sign Up</span>
      </Link>
    </div>
  )
}