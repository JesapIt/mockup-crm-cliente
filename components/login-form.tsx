"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Lock, Mail } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In un'applicazione reale, faresti una chiamata API per autenticare l'utente
      // Per scopi dimostrativi, simuleremo un login riuscito
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simula login riuscito
      if (email === "admin@example.com" && password === "password") {
        toast({
          title: "Accesso riuscito",
          description: "Reindirizzamento alla dashboard...",
        })
        router.push("/dashboard")
      } else {
        toast({
          title: "Accesso fallito",
          description: "Email o password non validi",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Accesso fallito",
        description: "Si è verificato un errore durante l'accesso",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            id="email"
            type="email"
            placeholder="esempio@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <a href="#" className="text-sm text-primary hover:underline">
            Password dimenticata?
          </a>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            id="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Accesso in corso..." : "Accedi"}
      </Button>
      <div className="text-center text-sm">
        <p className="text-gray-600">Credenziali demo: admin@example.com / password</p>
      </div>
    </form>
  )
}
