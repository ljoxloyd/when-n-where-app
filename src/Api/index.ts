import { TelegramUser } from "../models"


const put = (url: string, data: any) =>
  fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

export const authTelegramUser = async (user: TelegramUser) => {
  const res = await put('api/auth-tg', user)
  return await res.json()
}
