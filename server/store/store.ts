import { MongoClient } from 'mongodb'
import { TelegramUser, User, TgUserAdapter } from 'wnw-types'

const USERS = 'users'

export class Store {
  constructor(private client: MongoClient) {
    client.connect().catch(console.log)
  }

  async dbAccess() {
    return this.client.db()
  }

  async getUser(id: string) {
    const db = await this.dbAccess()

    return db.collection(USERS).findOne({ id })
  }

  async createUser(user: User) {
    const db = await this.dbAccess()

    db.collection(USERS).insertOne(user)
  }
}
