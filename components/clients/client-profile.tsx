import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Globe, Mail, Phone, MapPin, FileText, Plus } from "lucide-react"

interface Contact {
  id: string
  name: string
  title: string
  email: string
  phone: string
}

interface Interaction {
  id: string
  type: string
  date: string
  notes: string
  user: string
}

interface ClientProfileProps {
  client: {
    id: string
    name: string
    email: string
    phone: string
    status: string
    type: string
    lastContact: string
    address: string
    website: string
    industry: string
    notes: string
    contacts: Contact[]
    interactions: Interaction[]
  }
}

export function ClientProfile({ client }: ClientProfileProps) {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Panoramica</TabsTrigger>
        <TabsTrigger value="contacts">Contatti</TabsTrigger>
        <TabsTrigger value="interactions">Interazioni</TabsTrigger>
        <TabsTrigger value="contracts">Contratti</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Informazioni Cliente</CardTitle>
              <CardDescription>Informazioni di base sul cliente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Stato</p>
                  <Badge variant={client.status === "Attivo" ? "default" : "secondary"}>{client.status}</Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Tipo Cliente</p>
                  <p className="text-sm">{client.type}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Settore</p>
                  <p className="text-sm">{client.industry}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Ultimo Contatto</p>
                  <p className="text-sm">{new Date(client.lastContact).toLocaleDateString()}</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{client.email}</p>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{client.phone}</p>
                </div>
                <div className="flex items-center">
                  <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                  <a
                    href={client.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    {client.website}
                  </a>
                </div>
                <div className="flex items-start">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{client.address}</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <p className="text-sm font-medium">Note</p>
                <p className="text-sm">{client.notes}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Azioni Rapide</CardTitle>
              <CardDescription>Attività comuni per questo cliente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Crea Contratto
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Aggiungi Interazione
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Invia Email
              </Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="contacts" className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div>
              <CardTitle>Contatti</CardTitle>
              <CardDescription>Persone associate a questo cliente</CardDescription>
            </div>
            <Button className="ml-auto">
              <Plus className="mr-2 h-4 w-4" />
              Aggiungi Contatto
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {client.contacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <a href={`mailto:${contact.email}`} className="text-sm text-primary hover:underline">
                      {contact.email}
                    </a>
                    <span className="text-muted-foreground">•</span>
                    <a href={`tel:${contact.phone}`} className="text-sm text-primary hover:underline">
                      {contact.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="interactions" className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div>
              <CardTitle>Interazioni</CardTitle>
              <CardDescription>Storico delle comunicazioni con questo cliente</CardDescription>
            </div>
            <Button className="ml-auto">
              <Plus className="mr-2 h-4 w-4" />
              Aggiungi Interazione
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {client.interactions.map((interaction) => (
                <div key={interaction.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{interaction.type}</Badge>
                      <p className="text-sm font-medium">{new Date(interaction.date).toLocaleDateString()}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Da {interaction.user}</p>
                  </div>
                  <p className="text-sm">{interaction.notes}</p>
                  <Separator />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="contracts" className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div>
              <CardTitle>Contratti</CardTitle>
              <CardDescription>Contratti attivi e passati con questo cliente</CardDescription>
            </div>
            <Button className="ml-auto">
              <Plus className="mr-2 h-4 w-4" />
              Crea Contratto
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <p className="text-muted-foreground">Nessun contratto trovato per questo cliente.</p>
              <Button variant="outline" className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Crea Primo Contratto
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
