import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { ContractsTable } from "@/components/contracts/contracts-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Contratti | CRM Pro",
  description: "Gestisci i tuoi contratti con i clienti",
}

export default function ContractsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Contratti" text="Gestisci i tuoi contratti con i clienti.">
        <Link href="/dashboard/contracts/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Crea Contratto
          </Button>
        </Link>
      </DashboardHeader>
      <ContractsTable />
    </DashboardShell>
  )
}
