import useSWR from 'swr'
import axios from 'axios'
import type Lecture from 'types/lecture'

const getTodaySchedule = async (groupCode: string) => {
  if (!groupCode) return null
  const res = await axios.get<Lecture[]>(`/api/today?code=${groupCode}`)
  return res?.data
}

const useToday = (groupCode: string) => {
  const { data, ...hookProps } = useSWR<Lecture[]>(['today', groupCode], () => getTodaySchedule(groupCode))

  return { ...hookProps, data, lectures: data }
}

export default useToday
