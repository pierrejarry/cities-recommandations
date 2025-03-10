import { ShieldAlertIcon } from "lucide-react"
import './ErrorMessage.css'

function ErrorMessage({text}: {text: string}) {
  return (
    <div className="error" role="alert">
        <ShieldAlertIcon 
          color='var(--error-color)' 
          size={32}
        />
        {text}
    </div>
  )
}

export default ErrorMessage