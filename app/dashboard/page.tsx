import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { SalesChart } from "@/components/dashboard/sales-chart"
import { ClientsChart } from "@/components/dashboard/clients-chart"

export const metadata: Metadata = {
  title: "Dashboard | CRM Pro",
  description: "Dashboard CRM con indicatori chiave di prestazione e visualizzazioni dati",
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Visualizza le prestazioni del tuo CRM a colpo d'occhio." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardStats />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <SalesChart />
        </div>
        <div className="col-span-3">
          <ClientsChart />
        </div>
      </div>
      <div className="mt-4">
        <RecentActivity />
      </div>
    </DashboardShell>
  )
}
