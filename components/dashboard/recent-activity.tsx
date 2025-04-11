import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, Users, DollarSign } from "lucide-react"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "client",
      title: "Nuovo cliente aggiunto",
      description: "Acme Corporation è stata aggiunta come nuovo cliente",
      date: "2 ore fa",
      icon: Users,
      user: {
        name: "Giovanni Rossi",
        email: "giovanni@example.com",
        avatar: "/placeholder.svg",
        initials: "GR",
      },
    },
    {
      id: 2,
      type: "contract",
      title: "Contratto firmato",
      description: "Contratto di servizio annuale con TechGiant Inc.",
      date: "5 ore fa",
      icon: FileText,
      user: {
        name: "Maria Bianchi",
        email: "maria@example.com",
        avatar: "/placeholder.svg",
        initials: "MB",
      },
    },
    {
      id: 3,
      type: "payment",
      title: "Pagamento ricevuto",
      description: "€12.500 pagamento da Globex Corporation",
      date: "Ieri",
      icon: DollarSign,
      user: {
        name: "Marco Verdi",
        email: "marco@example.com",
        avatar: "/placeholder.svg",
        initials: "MV",
      },
    },
    {
      id: 4,
      type: "client",
      title: "Cliente aggiornato",
      description: "Aggiornate le informazioni di contatto per Initech",
      date: "2 giorni fa",
      icon: Users,
      user: {
        name: "Sara Neri",
        email: "sara@example.com",
        avatar: "/placeholder.svg",
        initials: "SN",
      },
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attività Recenti</CardTitle>
        <CardDescription>Ultime azioni e aggiornamenti nel tuo CRM</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <div className="mr-4 mt-0.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                  <activity.icon className="h-4 w-4" />
                </span>
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.date}</p>
                </div>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
              </div>
              <div className="ml-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                  <AvatarFallback>{activity.user.initials}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
