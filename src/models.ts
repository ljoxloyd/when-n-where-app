
type UserId = string
type EventId = string
type PlaceID = string
type ScheduleId = string

export interface User {
  id: UserId
  name: string
  login: string
  joins: Array<EventId>
  password?: string
  avaSrc?: string
  email?: string
  tgId?: string
}

export interface ScheduleItem {
  id: ScheduleId
  dates: Array<string>
  time: Array<string>
  type: "free" | "busy"
}

export interface Participant {
  id: UserId
  schedule: Record<string, ScheduleItem>
  placeVote: Array<PlaceID>
}

export interface Event {
  id: EventId
  name: string
  party: Array<UserId>
  host: string
  info: string
  address?: string
  coordinates?: Array<number>
}
export interface TelegramUser {
  id: number
  first_name: string
  username: string
  photo_url: string
  auth_date: number
  hash: string
}

export const TgUserAdapter = (tg_user: TelegramUser): User => ({
  id: String(tg_user.id),
  name: tg_user.first_name,
  avaSrc: tg_user.photo_url,
  login: tg_user.username,
  tgId: String(tg_user.id),
  joins: [],
})
