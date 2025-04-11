import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, FileText, TrendingUp } from "lucide-react"

export function DashboardStats() {
  const stats = [
    {
      title: "Clienti Totali",
      value: "254",
      icon: Users,
      change: "+12%",
      description: "rispetto al mese scorso",
    },
    {
      title: "Fatturato Totale",
      value: "€45.231,89",
      icon: DollarSign,
      change: "+5,4%",
      description: "rispetto al mese scorso",
    },
    {
      title: "Contratti Attivi",
      value: "128",
      icon: FileText,
      change: "+8,1%",
      description: "rispetto al mese scorso",
    },
    {
      title: "Tasso di Conversione",
      value: "24,3%",
      icon: TrendingUp,
      change: "+2,5%",
      description: "rispetto al mese scorso",
    },
  ]

  return (
    <>
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">{stat.change}</span> {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
