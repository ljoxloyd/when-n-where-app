import * as express from 'express'
import * as path from 'path'
import { TelegramUser, TgUserAdapter as _adapter, User } from 'wnw-types'
import { throwErr } from 'utils'
import { MongoClient } from 'mongodb'
import { Store } from './store/store'

//===========================================================================//
// Setting up necessary variables
const PORT = process.env.PORT || 8000
const DB_URL = process.env.DB_URL || throwErr('No Database URL in ENV')

//initializing database
const client = new MongoClient(DB_URL, { useUnifiedTopology: true })
const store = new Store(client)

//getting routes
const app = express()
const api = express()

//===========================================================================//
// Here applies JSON-parsing middlware
// static files served
// and API route applied
app
  .use(express.json(), express.urlencoded({ extended: true }))
  .use('/api', api)
  .use(express.static(path.join(__dirname, 'public')))

//===========================================================================//
// API methods
api.put('/auth-tg', async (req, res) => {
  const user = TgUserAdapter(req.body)

  const realUser = await store.getUser(String(user.id))

  if (!realUser) await store.createUser(user)

  res.json(realUser ?? user)
})

//===========================================================================//
app.listen(PORT, () => {
  console.log('Running on port', PORT)
})

//===========================================================================//
function TgUserAdapter(user: any): User {
  if (!isTgUser(user)) return user
  return _adapter(user)
}

//prettier-ignore
function isTgUser (body: any): body is TelegramUser {
  return 'hash' in body &&
         'auth_date' in body &&
         'first_name' in body
}
