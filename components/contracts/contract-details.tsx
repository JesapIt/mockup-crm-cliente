"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Clock, Download, FileText, User } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { generateInvoicePDF } from "@/lib/pdf-generator"

interface ContractItem {
  id: string
  name: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

interface HistoryItem {
  id: string
  date: string
  action: string
  user: string
}

interface ContractDetailsProps {
  contract: {
    id: string
    name: string
    client: string
    clientId: string
    value: number
    startDate: string
    endDate: string
    status: string
    description: string
    terms: string
    items: ContractItem[]
    history: HistoryItem[]
  }
}

export function ContractDetails({ contract }: ContractDetailsProps) {
  useEffect(() => {
    const generateInvoiceBtn = document.getElementById("generate-invoice-btn")
    if (generateInvoiceBtn) {
      generateInvoiceBtn.addEventListener("click", () => {
        generateInvoicePDF(contract)
      })
    }

    return () => {
      if (generateInvoiceBtn) {
        generateInvoiceBtn.removeEventListener("click", () => {
          generateInvoicePDF(contract)
        })
      }
    }
  }, [contract])

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Panoramica</TabsTrigger>
        <TabsTrigger value="items">Voci</TabsTrigger>
        <TabsTrigger value="history">Cronologia</TabsTrigger>
        <TabsTrigger value="documents">Documenti</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Informazioni Contratto</CardTitle>
              <CardDescription>Informazioni di base sul contratto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Stato</p>
                  <Badge
                    variant={
                      contract.status === "Attivo"
                        ? "default"
                        : contract.status === "Bozza"
                          ? "outline"
                          : contract.status === "Completato"
                            ? "secondary"
                            : "destructive"
                    }
                  >
                    {contract.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Cliente</p>
                  <Link
                    href={`/dashboard/clients/${contract.clientId}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {contract.client}
                  </Link>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Valore Contratto</p>
                  <p className="text-sm">
                    {new Intl.NumberFormat("it-IT", {
                      style: "currency",
                      currency: "EUR",
                    }).format(contract.value)}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Durata</p>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">
                      {new Date(contract.startDate).toLocaleDateString("it-IT")} -{" "}
                      {new Date(contract.endDate).toLocaleDateString("it-IT")}
                    </p>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <p className="text-sm font-medium">Descrizione</p>
                <p className="text-sm">{contract.description}</p>
              </div>
              <Separator />
              <div className="space-y-2">
                <p className="text-sm font-medium">Termini e Condizioni</p>
                <p className="text-sm">{contract.terms}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Azioni Rapide</CardTitle>
              <CardDescription>Attività comuni per questo contratto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline" onClick={() => generateInvoicePDF(contract)}>
                <Download className="mr-2 h-4 w-4" />
                Genera Fattura
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Esporta come PDF
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Clock className="mr-2 h-4 w-4" />
                Estendi Contratto
              </Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="items" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Voci</CardTitle>
            <CardDescription>Prodotti e servizi inclusi in questo contratto</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Voce</TableHead>
                  <TableHead>Descrizione</TableHead>
                  <TableHead className="text-right">Quantità</TableHead>
                  <TableHead className="text-right">Prezzo Unitario</TableHead>
                  <TableHead className="text-right">Totale</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contract.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">
                      {new Intl.NumberFormat("it-IT", {
                        style: "currency",
                        currency: "EUR",
                      }).format(item.unitPrice)}
                    </TableCell>
                    <TableCell className="text-right">
                      {new Intl.NumberFormat("it-IT", {
                        style: "currency",
                        currency: "EUR",
                      }).format(item.total)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4} className="text-right font-medium">
                    Totale
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {new Intl.NumberFormat("it-IT", {
                      style: "currency",
                      currency: "EUR",
                    }).format(contract.value)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="history" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Cronologia Contratto</CardTitle>
            <CardDescription>Cronologia degli eventi relativi a questo contratto</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {contract.history.map((item) => (
                <div key={item.id} className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-muted bg-background">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    {item.id !== contract.history[contract.history.length - 1].id && (
                      <div className="h-full w-px bg-muted" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium">{item.action}</p>
                      <p className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString("it-IT")}</p>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <User className="mr-1 h-3 w-3" />
                      {item.user}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="documents" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Documenti</CardTitle>
            <CardDescription>File e documenti relativi a questo contratto</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <p className="text-muted-foreground">Nessun documento trovato per questo contratto.</p>
              <Button variant="outline" className="mt-4">
                <FileText className="mr-2 h-4 w-4" />
                Carica Documento
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
