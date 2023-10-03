import type Group from './group'

interface Student {
  id: string
  name: string
  phone: string
  email: string
  group_code: string
  group?: Group
  status: string
  created_at: string
  updated_at: string
  is_transferred?: boolean
}

export default Student
