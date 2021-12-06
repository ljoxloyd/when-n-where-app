import React, { useEffect, useRef } from "react"
import { TelegramUser } from "../../../../models"
import { withDevFallback } from "../../../HOCs"

interface TgLoginProps {
  botName: string
  onAuth: (user: TelegramUser) => void
  userPic?: boolean
  className?: string
  cornerRadius?: number
  requestAccess?: boolean
  buttonSize?: "large" | "medium" | "small"
}

declare global {
  interface Window {
    TelegramLoginWidget: {
      dataOnauth: (user: TelegramUser) => void
    }
  }
}

const TelegramLogin = ({
  botName,      userPic = false,
  className,    buttonSize = 'large',
  onAuth,   requestAccess = true,
  cornerRadius,
}: TgLoginProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    window.TelegramLoginWidget = {
      dataOnauth: (user: TelegramUser) => onAuth(user)
    }

    const script = document.createElement('script')
    script.src = 'https://telegram.org/js/telegram-widget.js?15'
    script.setAttribute('data-telegram-login', botName)
    script.setAttribute('data-size', buttonSize)

    if (cornerRadius !== undefined) {
      script.setAttribute('data-radius', cornerRadius.toString())
    }

    if (requestAccess) {
      script.setAttribute('data-request-access', 'write')
    }

    script.setAttribute('data-userpic', userPic.toString())
    script.setAttribute('data-onauth', 'TelegramLoginWidget.dataOnauth(user)')
    script.async = true

    ref.current.appendChild(script)
  }, [ botName, buttonSize, cornerRadius, onAuth, requestAccess, userPic, ref ])

  return <div ref={ref} className={className} />
}

export default withDevFallback(TelegramLogin)

