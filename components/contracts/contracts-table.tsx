"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, Download, MoreHorizontal, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { generateInvoicePDF } from "@/lib/pdf-generator"

// Dati di esempio dei contratti
const data = [
  {
    id: "1",
    name: "Accordo di Servizio Annuale",
    client: "Acme Corporation",
    clientId: "1",
    value: 50000,
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    status: "Attivo",
  },
  {
    id: "2",
    name: "Sviluppo Software",
    client: "TechGiant Inc.",
    clientId: "2",
    value: 75000,
    startDate: "2023-02-15",
    endDate: "2023-08-15",
    status: "Attivo",
  },
  {
    id: "3",
    name: "Servizi di Consulenza",
    client: "Globex Corporation",
    clientId: "3",
    value: 25000,
    startDate: "2023-03-01",
    endDate: "2023-06-01",
    status: "Scaduto",
  },
  {
    id: "4",
    name: "Supporto IT",
    client: "Initech",
    clientId: "4",
    value: 12000,
    startDate: "2023-01-15",
    endDate: "2023-12-15",
    status: "Attivo",
  },
  {
    id: "5",
    name: "Audit di Sicurezza",
    client: "Umbrella Corporation",
    clientId: "5",
    value: 15000,
    startDate: "2023-04-01",
    endDate: "2023-05-01",
    status: "Completato",
  },
  {
    id: "6",
    name: "Migrazione Cloud",
    client: "Stark Industries",
    clientId: "6",
    value: 60000,
    startDate: "2023-05-01",
    endDate: "2023-11-01",
    status: "Attivo",
  },
  {
    id: "7",
    name: "Analisi Dati",
    client: "Wayne Enterprises",
    clientId: "7",
    value: 30000,
    startDate: "2023-02-01",
    endDate: "2023-05-01",
    status: "Completato",
  },
  {
    id: "8",
    name: "Redesign Sito Web",
    client: "Cyberdyne Systems",
    clientId: "8",
    value: 20000,
    startDate: "2023-06-01",
    endDate: "2023-09-01",
    status: "Bozza",
  },
  {
    id: "9",
    name: "Sviluppo App Mobile",
    client: "Oscorp Industries",
    clientId: "9",
    value: 45000,
    startDate: "2023-07-01",
    endDate: "2023-12-31",
    status: "Bozza",
  },
  {
    id: "10",
    name: "Infrastruttura di Rete",
    client: "LexCorp",
    clientId: "10",
    value: 80000,
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    status: "Attivo",
  },
]

export type Contract = {
  id: string
  name: string
  client: string
  clientId: string
  value: number
  startDate: string
  endDate: string
  status: "Attivo" | "Bozza" | "Scaduto" | "Completato"
}

export function ContractsTable() {
  const router = useRouter()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const handleGenerateInvoice = (contract: Contract) => {
    generateInvoicePDF(contract)
  }

  const columns: ColumnDef<Contract>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Seleziona tutto"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Seleziona riga"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Nome Contratto
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "client",
      header: "Cliente",
      cell: ({ row }) => (
        <div
          className="underline cursor-pointer"
          onClick={(e) => {
            e.stopPropagation()
            router.push(`/dashboard/clients/${row.original.clientId}`)
          }}
        >
          {row.getValue("client")}
        </div>
      ),
    },
    {
      accessorKey: "value",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Valore
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue("value"))
        const formatted = new Intl.NumberFormat("it-IT", {
          style: "currency",
          currency: "EUR",
        }).format(amount)

        return <div>{formatted}</div>
      },
    },
    {
      accessorKey: "startDate",
      header: "Data Inizio",
      cell: ({ row }) => {
        const date = new Date(row.getValue("startDate"))
        return <div>{date.toLocaleDateString("it-IT")}</div>
      },
    },
    {
      accessorKey: "endDate",
      header: "Data Fine",
      cell: ({ row }) => {
        const date = new Date(row.getValue("endDate"))
        return <div>{date.toLocaleDateString("it-IT")}</div>
      },
    },
    {
      accessorKey: "status",
      header: "Stato",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge
            variant={
              status === "Attivo"
                ? "default"
                : status === "Bozza"
                  ? "outline"
                  : status === "Completato"
                    ? "secondary"
                    : "destructive"
            }
          >
            {status}
          </Badge>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const contract = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Apri menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Azioni</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => router.push(`/dashboard/contracts/${contract.id}`)}>
                Visualizza dettagli
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push(`/dashboard/contracts/${contract.id}/edit`)}>
                Modifica
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  handleGenerateInvoice(contract)
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                Genera Fattura
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Elimina</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Filtra contratti..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colonne <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => router.push(`/dashboard/contracts/${row.original.id}`)}
                  className="cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Nessun risultato.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} di {table.getFilteredRowModel().rows.length} riga/righe
          selezionate.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Precedente
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Successivo
          </Button>
        </div>
      </div>
    </div>
  )
}
