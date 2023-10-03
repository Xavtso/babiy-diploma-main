import type Lecture from './lecture'

interface Discipline {
  id: string
  title: string

  classes?: Lecture[]
}

export default Discipline
