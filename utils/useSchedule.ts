import { useMemo } from 'react'
import useSWR from 'swr'
import axios from 'axios'
import type Lecture from 'types/lecture'

const getScheduleData = async (groupCode: string, start: string, end: string) => {
  if (!groupCode) return null
  const res = await axios.get<Lecture[]>(`/api/schedule?code=${groupCode}&start=${start}&end=${end}`)
  return res?.data
}

function addDays(date: string | Date, days: number) {
  const result = new Date(date)
  if (!days) return result
  result.setDate(result.getDate() + days)
  return result
}

function getDateByWeek(week: number, year: number) {
  // Create a date for 1 Jan in required year
  const d = new Date(year, 0)
  // Get day of week number, sun = 0, mon = 1, etc.
  const dayNum = d.getDay()
  // Get days to add
  let requiredDate = --week * 7

  // For ISO week numbering
  // If 1 Jan is Friday to Sunday, go to next week
  if (dayNum > 0 || dayNum > 4) {
    requiredDate += 7
  }

  // Add required number of days
  d.setDate(2 - d.getDay() + ++requiredDate)
  d.setHours(0, 0, 0, 0)

  return d
}

export interface Day {
  date: string
  classes: Lecture[]
}

interface useScheduleProps {
  code: string
  week: number
  year: number
}

const useSchedule = ({ code, week, year }: useScheduleProps) => {
  const date = getDateByWeek(week, year)
  const start = date.toISOString().slice(0, 10)
  const end = addDays(date, 7).toISOString().slice(0, 10)

  const { data, ...hookProps } = useSWR<Lecture[]>(['schedule', code, start, end], () => getScheduleData(code, start, end))

  const schedule = useMemo(() => {
    if (!data) return null

    const days: Day[] = [...Array(7).keys()].map((i) => ({
      date: addDays(start, i).toISOString().slice(0, 10),
      classes: [],
    }))

    data.forEach?.((lecture) => days.find((day) => lecture?.start_time?.startsWith?.(day.date))?.classes.push(lecture))

    // @ts-ignore
    days.forEach((day) => day.classes.sort((lecture1, lecture2) => new Date(lecture1.start_time) - new Date(lecture2.start_time)))

    return days
  }, [data, start])

  return { ...hookProps, data, schedule }
}

export default useSchedule
