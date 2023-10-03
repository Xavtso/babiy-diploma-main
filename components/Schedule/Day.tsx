import React from 'react'
import dayjs from 'dayjs'
import { prettyWeekDay } from 'utils/utils'
import { Day as IDay } from 'utils/useSchedule'
import { DayWrapper, DayTitle, DayInner } from './styles'
import Lecture from './Lecture'

interface DayProps {
  day: IDay
}

const Day: React.FC<DayProps> = ({ day }) => {
  if (!day) return null

  const { date, classes } = day

  const title = `${prettyWeekDay(date)} ${dayjs(date).format('DD/MM')}`

  return (
    <DayWrapper>
      <DayTitle>{title}</DayTitle>
      <DayInner>
        {classes?.map?.((lecture) => (
          <li key={lecture.id}>
            <Lecture lecture={lecture} />
          </li>
        ))}
      </DayInner>
    </DayWrapper>
  )
}

export default Day
