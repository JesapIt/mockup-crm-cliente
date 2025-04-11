"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart"

export function SalesChart() {
  // Dati di esempio per il grafico
  const data = [
    { name: "Gen", sales: 4000, contracts: 24 },
    { name: "Feb", sales: 3000, contracts: 18 },
    { name: "Mar", sales: 5000, contracts: 30 },
    { name: "Apr", sales: 2780, contracts: 16 },
    { name: "Mag", sales: 1890, contracts: 11 },
    { name: "Giu", sales: 2390, contracts: 14 },
    { name: "Lug", sales: 3490, contracts: 21 },
    { name: "Ago", sales: 4000, contracts: 24 },
    { name: "Set", sales: 2000, contracts: 12 },
    { name: "Ott", sales: 2780, contracts: 16 },
    { name: "Nov", sales: 1890, contracts: 11 },
    { name: "Dic", sales: 3490, contracts: 21 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Panoramica Vendite</CardTitle>
        <CardDescription>Andamento mensile di vendite e contratti</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sales">
          <TabsList className="mb-4">
            <TabsTrigger value="sales">Vendite</TabsTrigger>
            <TabsTrigger value="contracts">Contratti</TabsTrigger>
          </TabsList>
          <TabsContent value="sales">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="sales" stroke="#8884d8" fill="#8884d8" name="Vendite (€)" />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="contracts">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="contracts" stroke="#82ca9d" fill="#82ca9d" name="Contratti" />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
