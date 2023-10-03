import useSWR from 'swr'
import axios from 'axios'
import type Discipline from 'types/discipline'

const getDiscpilines = async (groupCode: string) => {
  if (!groupCode) return null
  const res = await axios.get<Discipline[]>(`/api/disciplines?code=${groupCode}`)
  return res?.data
}

const useDisciplines = (groupCode: string) => {
  const { data, ...hookProps } = useSWR<Discipline[]>(['disciplines', groupCode], () => getDiscpilines(groupCode))

  return { ...hookProps, data, disciplines: data }
}

export default useDisciplines
