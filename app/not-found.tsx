import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export default function NotFound() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Помилка</AlertTitle>
      <AlertDescription>
        Такої сторінки не існує.
      </AlertDescription>
    </Alert>
  )
}
