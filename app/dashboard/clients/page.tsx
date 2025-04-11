import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { ClientsTable } from "@/components/clients/clients-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Clienti | CRM Pro",
  description: "Gestisci le tue relazioni con i clienti",
}

export default function ClientsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Clienti" text="Gestisci le tue relazioni con i clienti.">
        <Link href="/dashboard/clients/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Aggiungi Cliente
          </Button>
        </Link>
      </DashboardHeader>
      <ClientsTable />
    </DashboardShell>
  )
}
