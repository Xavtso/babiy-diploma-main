import useSWR from 'swr'
import axios from 'axios'
import type Task from 'types/task'

const getTasks = async (id: string) => {
  if (!id) return null
  const res = await axios.get<Task[]>(`/api/tasks?id=${id}`)
  return res?.data
}

const useTasks = (userId: string) => {
  const { data, ...hookProps } = useSWR<Task[]>(['tasks', userId], () => getTasks(userId))

  return { ...hookProps, data, tasks: data }
}

export default useTasks
