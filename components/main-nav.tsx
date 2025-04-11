"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, Users, FileText, Home } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: Home,
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/clients",
      label: "Clienti",
      icon: Users,
      active: pathname === "/dashboard/clients" || pathname.startsWith("/dashboard/clients/"),
    },
    {
      href: "/dashboard/contracts",
      label: "Contratti",
      icon: FileText,
      active: pathname === "/dashboard/contracts" || pathname.startsWith("/dashboard/contracts/"),
    },
    {
      href: "/dashboard/reports",
      label: "Rapporti",
      icon: BarChart3,
      active: pathname === "/dashboard/reports",
    },
  ]

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "flex items-center text-sm font-medium transition-colors hover:text-primary",
            route.active ? "text-primary" : "text-muted-foreground",
          )}
        >
          <route.icon className="mr-2 h-4 w-4" />
          {route.label}
        </Link>
      ))}
    </nav>
  )
}
