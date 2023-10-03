import useSWR from 'swr'
import axios from 'axios'
import type Discipline from 'types/discipline'
import type Task from 'types/task'

interface QueryData {
  discipline: Discipline
  tasks: Task[]
}

const getDiscpilineTasks = async (id: string, groupCode: string) => {
  if (!id || !groupCode) return null
  const res = await axios.get<QueryData>(`/api/disciplineTasks?id=${id}&code=${groupCode}`)
  return res?.data
}

const useDisciplineTasks = (id: string, code: string) => {
  const { data, ...hookProps } = useSWR<QueryData>(['tasks', id, code], () => getDiscpilineTasks(id, code))

  return { ...hookProps, data, discipline: data?.discipline, tasks: data?.tasks }
}

export default useDisciplineTasks
