import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { ContractDetails } from "@/components/contracts/contract-details"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Edit, Trash } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Dettagli Contratto | CRM Pro",
  description: "Visualizza e gestisci i dettagli del contratto",
}

// Normalmente questo recupererebbe i dati da un'API o un database
const getContract = (id: string) => {
  const contracts = [
    {
      id: "1",
      name: "Accordo di Servizio Annuale",
      client: "Acme Corporation",
      clientId: "1",
      value: 50000,
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      status: "Attivo",
      description: "Accordo di servizio completo che copre tutte le esigenze di infrastruttura IT e supporto.",
      terms:
        "Termini di pagamento Net 30. Ciclo di fatturazione mensile. Rinnovo automatico se non annullato 30 giorni prima della data di fine.",
      items: [
        {
          id: "i1",
          name: "Supporto IT - Livello 1",
          description: "Supporto helpdesk 24/7 per tutti i dipendenti",
          quantity: 12,
          unitPrice: 2500,
          total: 30000,
        },
        {
          id: "i2",
          name: "Manutenzione Server",
          description: "Manutenzione e aggiornamenti mensili del server",
          quantity: 12,
          unitPrice: 1000,
          total: 12000,
        },
        {
          id: "i3",
          name: "Audit di Sicurezza",
          description: "Audit di sicurezza e report trimestrali",
          quantity: 4,
          unitPrice: 2000,
          total: 8000,
        },
      ],
      history: [
        {
          id: "h1",
          date: "2022-12-15",
          action: "Contratto Creato",
          user: "Utente Admin",
        },
        {
          id: "h2",
          date: "2022-12-20",
          action: "Contratto Inviato al Cliente",
          user: "Utente Admin",
        },
        {
          id: "h3",
          date: "2022-12-28",
          action: "Contratto Firmato",
          user: "Utente Admin",
        },
        {
          id: "h4",
          date: "2023-01-05",
          action: "Prima Fattura Inviata",
          user: "Utente Admin",
        },
      ],
    },
    // Altri contratti sarebbero qui
  ]

  const contract = contracts.find((c) => c.id === id)
  if (!contract) return null
  return contract
}

export default function ContractPage({ params }: { params: { id: string } }) {
  const contract = getContract(params.id)

  if (!contract) {
    notFound()
  }

  return (
    <DashboardShell>
      <div className="flex items-center">
        <Link href="/dashboard/contracts">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <DashboardHeader heading={contract.name} text={`Contratto con ${contract.client}`}>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" id="generate-invoice-btn" data-contract-id={contract.id}>
              <Download className="mr-2 h-4 w-4" />
              Genera Fattura
            </Button>
            <Link href={`/dashboard/contracts/${contract.id}/edit`}>
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
      <ContractDetails contract={contract} />
    </DashboardShell>
  )
}
