"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/tasks", label: "Tasks" },
    { href: "/analytics", label: "Analytics" },
    { href: "/settings", label: "Settings" },
  ]

  return (
    <nav className="border-b px-6 py-4">
      <div className="flex gap-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={
              pathname === link.href
                ? "font-bold"
                : "text-gray-500"
            }
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}