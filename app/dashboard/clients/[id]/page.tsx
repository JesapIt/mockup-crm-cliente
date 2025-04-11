import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { ClientProfile } from "@/components/clients/client-profile"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit, Trash } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Dettagli Cliente | CRM Pro",
  description: "Visualizza e gestisci i dettagli del cliente",
}

// Normalmente questo recupererebbe i dati da un'API o un database
const getClient = (id: string) => {
  const clients = [
    {
      id: "1",
      name: "Acme Corporation",
      email: "contatto@acme.com",
      phone: "(555) 123-4567",
      status: "Attivo",
      type: "Enterprise",
      lastContact: "2023-06-15",
      address: "Via Roma 123, Milano, Italia",
      website: "https://acme.com",
      industry: "Produzione",
      notes: "Cliente di lunga data con contratti multipli",
      contacts: [
        {
          id: "c1",
          name: "Giovanni Rossi",
          title: "CEO",
          email: "giovanni@acme.com",
          phone: "(555) 123-4567",
        },
        {
          id: "c2",
          name: "Maria Bianchi",
          title: "CTO",
          email: "maria@acme.com",
          phone: "(555) 123-4568",
        },
      ],
      interactions: [
        {
          id: "i1",
          type: "Riunione",
          date: "2023-06-15",
          notes: "Discusso rinnovo contratto",
          user: "Utente Admin",
        },
        {
          id: "i2",
          type: "Email",
          date: "2023-06-10",
          notes: "Inviata proposta per nuovi servizi",
          user: "Utente Admin",
        },
        {
          id: "i3",
          type: "Chiamata",
          date: "2023-06-05",
          notes: "Follow-up sui progressi di implementazione",
          user: "Utente Admin",
        },
      ],
    },
    // Altri clienti sarebbero qui
  ]

  const client = clients.find((c) => c.id === id)
  if (!client) return null
  return client
}

export default function ClientPage({ params }: { params: { id: string } }) {
  const client = getClient(params.id)

  if (!client) {
    notFound()
  }

  return (
    <DashboardShell>
      <div className="flex items-center">
        <Link href="/dashboard/clients">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <DashboardHeader heading={client.name} text="Profilo e dettagli del cliente">
          <div className="flex space-x-2">
            <Link href={`/dashboard/clients/${client.id}/edit`}>
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Modifica
              </Button>
            </Link>
            <Button variant="outline" size="sm" className="text-red-500">
              <Trash className="mr-2 h-4 w-4" />
              Elimina
            </Button>
          </div>
        </DashboardHeader>
      </div>
      <ClientProfile client={client} />
    </DashboardShell>
  )
}
