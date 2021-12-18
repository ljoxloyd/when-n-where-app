import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TelegramLogin from './TgLogin/TgLogin'
import Select from '../../../Store/selectors'
import { AuthActions } from '../../../Store/slices/auth.slice'
import { authTelegramUser } from '../../../Api'
import AboutSection from './AboutSection/AboutSection'
import { TelegramUser } from '../../../models'

type TgUserProps = {
  photoUrl?: string
  firstName: string
  username: string
}

const TgUserBadge = ({ firstName, photoUrl, username }: TgUserProps) => (
  <section className="shadow-md bg-white rounded-md">
    <div className="flex m-2">
      <img
        src={photoUrl || ''}
        alt={firstName + ' photo'}
        className="rounded-full w-16 h-16"
      />
      <div className="flex flex-col justify-center ml-4">
        <span className="text-lg font-bold">{firstName} </span>
        <span className="text-gray-600"> {username}</span>
      </div>
    </div>
  </section>
)

type LoginScreenProps = {
  onAuth: (user: TelegramUser) => void
}

const LoginScreen = (props: LoginScreenProps) => (
  <section className="shadow-md bg-white rounded-md flex flex-col py-10 gap-10 items-center">
    <h2 className="font-bold text-2xl"> {'Login'} </h2>
    <TelegramLogin botName="app_wnw_auth_bot" onAuth={props.onAuth} />
  </section>
)

const MainPage = () => {
  const dispatch = useDispatch()

  const currentUser = useSelector(Select.user)

  const onAuth = useCallback((user: TelegramUser) => {
    authTelegramUser(user).then(user => dispatch(AuthActions.setUser(user)))
  }, [dispatch])

  return (
    <main className="container grid grid-cols-3 items-center" style={{ height: '80vh' }}>
      {!currentUser ? (
        <LoginScreen onAuth={onAuth} />
      ) : (
        <TgUserBadge
          username={currentUser.login}
          firstName={currentUser.name}
          photoUrl={currentUser.avaSrc}
        />
      )}
      <AboutSection />
    </main>
  )
}

export default MainPage
