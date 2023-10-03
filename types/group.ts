import type Student from './student'
import type Teacher from './teacher'

interface Group {
  code: string
  year_created: number
  created_at: string
  updated_at: string
  curator_id: string
  curator: Teacher
  headman_id: string
  headman?: Student
  students?: Student[]
}

export default Group
