import useSWR from 'swr'
import axios from 'axios'
import type Group from 'types/group'

const getGroup = async (groupCode: string) => {
  if (!groupCode) return null
  const res = await axios.get<Group>(`/api/group?code=${groupCode}`)
  return res?.data
}

const useGroup = (groupCode: string) => {
  const { data, ...hookProps } = useSWR<Group>(['group', groupCode], () => getGroup(groupCode))

  return { ...hookProps, data, group: data }
}

export default useGroup
