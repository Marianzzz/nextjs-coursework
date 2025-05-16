import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Сторінку медіа не знайдено',
  description: 'Сторінку цього медіа не знайдено',
}


export default function NotFound() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Помилка</AlertTitle>
      <AlertDescription>
        Такої медіа не існує.
      </AlertDescription>
    </Alert>
  )
}
