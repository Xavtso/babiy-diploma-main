import useSWR from 'swr'
import axios from 'axios'
import type Discipline from 'types/discipline'

const getDiscpilineLectures = async (id: string, groupCode: string) => {
  if (!id || !groupCode) return null
  const res = await axios.get<Discipline>(`/api/disciplineLectures?id=${id}&code=${groupCode}`)
  return res?.data
}

const useDisciplineLectures = (id: string, code: string) => {
  const { data, ...hookProps } = useSWR<Discipline>(['lectures', id, code], () => getDiscpilineLectures(id, code))

  return { ...hookProps, data, discipline: data, lectures: data?.classes }
}

export default useDisciplineLectures
