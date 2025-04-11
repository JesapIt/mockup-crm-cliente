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
import { ArrowUpDown, ChevronDown, MoreHorizontal, Search } from "lucide-react"
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

// Dati di esempio dei clienti
const data = [
  {
    id: "1",
    name: "Acme Corporation",
    email: "contatto@acme.com",
    phone: "(555) 123-4567",
    status: "Attivo",
    type: "Enterprise",
    lastContact: "2023-06-15",
  },
  {
    id: "2",
    name: "TechGiant Inc.",
    email: "info@techgiant.com",
    phone: "(555) 987-6543",
    status: "Attivo",
    type: "Enterprise",
    lastContact: "2023-06-10",
  },
  {
    id: "3",
    name: "Globex Corporation",
    email: "vendite@globex.com",
    phone: "(555) 456-7890",
    status: "Inattivo",
    type: "Media Impresa",
    lastContact: "2023-05-22",
  },
  {
    id: "4",
    name: "Initech",
    email: "contatto@initech.com",
    phone: "(555) 234-5678",
    status: "Attivo",
    type: "Piccola Impresa",
    lastContact: "2023-06-05",
  },
  {
    id: "5",
    name: "Umbrella Corporation",
    email: "info@umbrella.com",
    phone: "(555) 876-5432",
    status: "Attivo",
    type: "Enterprise",
    lastContact: "2023-06-12",
  },
  {
    id: "6",
    name: "Stark Industries",
    email: "contatto@stark.com",
    phone: "(555) 345-6789",
    status: "Attivo",
    type: "Media Impresa",
    lastContact: "2023-06-08",
  },
  {
    id: "7",
    name: "Wayne Enterprises",
    email: "info@wayne.com",
    phone: "(555) 654-3210",
    status: "Inattivo",
    type: "Enterprise",
    lastContact: "2023-05-30",
  },
  {
    id: "8",
    name: "Cyberdyne Systems",
    email: "vendite@cyberdyne.com",
    phone: "(555) 789-0123",
    status: "Attivo",
    type: "Piccola Impresa",
    lastContact: "2023-06-01",
  },
  {
    id: "9",
    name: "Oscorp Industries",
    email: "contatto@oscorp.com",
    phone: "(555) 321-0987",
    status: "Attivo",
    type: "Media Impresa",
    lastContact: "2023-06-07",
  },
  {
    id: "10",
    name: "LexCorp",
    email: "info@lexcorp.com",
    phone: "(555) 210-9876",
    status: "Inattivo",
    type: "Enterprise",
    lastContact: "2023-05-25",
  },
]

export type Client = {
  id: string
  name: string
  email: string
  phone: string
  status: "Attivo" | "Inattivo"
  type: "Enterprise" | "Media Impresa" | "Piccola Impresa"
  lastContact: string
}

export function ClientsTable() {
  const router = useRouter()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const columns: ColumnDef<Client>[] = [
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
            Nome
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "phone",
      header: "Telefono",
      cell: ({ row }) => <div>{row.getValue("phone")}</div>,
    },
    {
      accessorKey: "status",
      header: "Stato",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return <Badge variant={status === "Attivo" ? "default" : "secondary"}>{status}</Badge>
      },
    },
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row }) => <div>{row.getValue("type")}</div>,
    },
    {
      accessorKey: "lastContact",
      header: "Ultimo Contatto",
      cell: ({ row }) => {
        const date = new Date(row.getValue("lastContact"))
        return <div>{date.toLocaleDateString()}</div>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const client = row.original

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
              <DropdownMenuItem onClick={() => router.push(`/dashboard/clients/${client.id}`)}>
                Visualizza dettagli
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push(`/dashboard/clients/${client.id}/edit`)}>
                Modifica
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
            placeholder="Filtra clienti..."
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
                  onClick={() => router.push(`/dashboard/clients/${row.original.id}`)}
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
