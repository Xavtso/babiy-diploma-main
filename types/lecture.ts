import type Teacher from './teacher'

interface Lecture {
  id: string
  title: string
  type: string
  start_time: string
  end_time: string
  link?: string
  teacher?: Teacher
}

export default Lecture
