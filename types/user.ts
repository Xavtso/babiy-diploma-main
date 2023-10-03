import type Group from './group'

type User = {
  token?: string
  id?: string
  name?: string
  group?: Group
  curator?: string
  email?: string
}

export default User
