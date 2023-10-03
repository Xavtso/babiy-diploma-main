import useUser from 'utils/useUser'
import Spinner from 'components/Spinner'

const Page = () => {
  useUser({ redirectTo: '/login' })
  useUser({ redirectTo: '/dashboard', redirectIfFound: true })

  return <Spinner />
}

export default Page
