import { LoginForm } from "@/components/login-form"

export default function Home() {
  // In un'applicazione reale, verificheresti se l'utente è già autenticato
  // e lo reindirizzeresti alla dashboard se lo è
  // Per scopi dimostrativi, mostreremo solo il modulo di login

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 p-10 bg-white rounded-xl shadow-lg mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Benvenuto</h1>
          <p className="mt-2 text-sm text-gray-600">Accedi per visualizzare la tua dashboard</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
