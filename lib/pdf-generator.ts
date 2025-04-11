import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"

interface ContractItem {
  id: string
  name: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

interface Contract {
  id: string
  name: string
  client: string
  clientId: string
  value: number
  startDate: string
  endDate: string
  status: string
  description?: string
  terms?: string
  items?: ContractItem[]
}

export function generateInvoicePDF(contract: Contract) {
  // Crea un nuovo documento PDF
  const doc = new jsPDF()

  // Aggiungi intestazione
  doc.setFontSize(20)
  doc.setTextColor(40, 40, 40)
  doc.text("FATTURA", 105, 20, { align: "center" })

  // Aggiungi logo e informazioni aziendali
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text("CRM Pro", 20, 40)
  doc.text("Via Roma 123", 20, 45)
  doc.text("20100 Milano, Italia", 20, 50)
  doc.text("P.IVA: IT12345678901", 20, 55)
  doc.text("Tel: +39 02 1234567", 20, 60)
  doc.text("Email: info@crmpro.it", 20, 65)

  // Informazioni cliente
  doc.setFontSize(12)
  doc.setTextColor(40, 40, 40)
  doc.text("Fatturato a:", 140, 40)
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text(contract.client, 140, 45)
  doc.text("Via Cliente 456", 140, 50)
  doc.text("20100 Milano, Italia", 140, 55)

  // Informazioni fattura
  doc.setFontSize(10)
  doc.setTextColor(40, 40, 40)
  doc.text("Fattura N°:", 20, 80)
  doc.text("INV-" + contract.id.padStart(5, "0"), 60, 80)

  doc.text("Data Fattura:", 20, 85)
  doc.text(new Date().toLocaleDateString("it-IT"), 60, 85)

  doc.text("Contratto:", 20, 90)
  doc.text(contract.name, 60, 90)

  doc.text("Periodo:", 20, 95)
  doc.text(
    `${new Date(contract.startDate).toLocaleDateString("it-IT")} - ${new Date(contract.endDate).toLocaleDateString("it-IT")}`,
    60,
    95,
  )

  // Tabella voci
  const items = contract.items || [
    {
      id: "default",
      name: contract.name,
      description: contract.description || "Servizi come da contratto",
      quantity: 1,
      unitPrice: contract.value,
      total: contract.value,
    },
  ]

  const tableHeaders = [["#", "Descrizione", "Quantità", "Prezzo Unitario", "Totale"]]

  const tableData = items.map((item, index) => [
    (index + 1).toString(),
    `${item.name}\n${item.description}`,
    item.quantity.toString(),
    formatCurrency(item.unitPrice),
    formatCurrency(item.total),
  ])

  autoTable(doc, {
    head: tableHeaders,
    body: tableData,
    startY: 105,
    theme: "grid",
    headStyles: {
      fillColor: [60, 60, 60],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    styles: {
      fontSize: 9,
      cellPadding: 5,
    },
    columnStyles: {
      0: { cellWidth: 10 },
      1: { cellWidth: 80 },
      2: { cellWidth: 20, halign: "center" },
      3: { cellWidth: 30, halign: "right" },
      4: { cellWidth: 30, halign: "right" },
    },
  })

  // Calcola la posizione Y dopo la tabella
  const finalY = (doc as any).lastAutoTable.finalY + 10

  // Aggiungi totale
  doc.setFontSize(10)
  doc.setTextColor(40, 40, 40)
  doc.text("Subtotale:", 140, finalY)
  doc.text(formatCurrency(contract.value), 170, finalY, { align: "right" })

  doc.text("IVA (22%):", 140, finalY + 5)
  const tax = contract.value * 0.22
  doc.text(formatCurrency(tax), 170, finalY + 5, { align: "right" })

  doc.setFontSize(12)
  doc.setFont(undefined, "bold")
  doc.text("Totale:", 140, finalY + 12)
  doc.text(formatCurrency(contract.value + tax), 170, finalY + 12, { align: "right" })

  // Aggiungi termini e condizioni
  doc.setFontSize(10)
  doc.setFont(undefined, "normal")
  doc.setTextColor(100, 100, 100)
  doc.text("Termini e Condizioni", 20, finalY + 25)
  doc.setFontSize(8)
  const terms =
    contract.terms ||
    "Pagamento entro 30 giorni dalla data di emissione della fattura. Interessi di mora applicabili in caso di ritardo."
  const splitTerms = doc.splitTextToSize(terms, 170)
  doc.text(splitTerms, 20, finalY + 30)

  // Aggiungi note di ringraziamento
  doc.setFontSize(9)
  doc.text("Grazie per la vostra fiducia!", 105, finalY + 45, { align: "center" })

  // Salva il PDF
  doc.save(`Fattura-${contract.client}-${contract.id}.pdf`)
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(amount)
}
