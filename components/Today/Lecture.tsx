import React from 'react'
import dayjs from 'dayjs'
import type ILecture from 'types/lecture'
import { Item, Cell } from './styles'

const prettyTime = (time: string) => dayjs(time).format('HH:mm')

interface LectureProps {
  lecture: ILecture
}

const Lecture: React.FC<LectureProps> = ({ lecture }) => {
  if (!lecture) return null
  const { title, type, start_time: startTime, end_time: endTime } = lecture

  return (
    <Item>
      <Cell>{title}</Cell>
      <Cell>{type}</Cell>
      <Cell>
        {prettyTime(startTime)} - {prettyTime(endTime)}
      </Cell>
    </Item>
  )
}

export default Lecture
