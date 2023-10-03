interface Task {
  id: string
  title: string
  description: string
  deadline: string
  uploads?: {
    link: string
    mark: string
  }[]
  class?: {
    id: string
    title: string
    discipline?: {
      id: string
      title: string
    }
  }
}

export default Task
