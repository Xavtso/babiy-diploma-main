import dayjs from 'dayjs'
import React from 'react'
import ILecture from 'types/lecture'
import { LectureWrapper, LectureTitle, LectureFooter, LectureType, LectureTime } from './styles'

const prettyTime = (time: string) => dayjs(time).format('HH:mm')

interface LectureProps {
  lecture: ILecture
}

const Lecture: React.FC<LectureProps> = ({ lecture }) => {
  if (!lecture) return null
  const { title, type, start_time: startTime, end_time: endTime } = lecture
  return (
    <LectureWrapper>
      <LectureTitle>{title}</LectureTitle>

      <LectureFooter>
        <LectureType>{type}</LectureType>
        <LectureTime>
          {prettyTime(startTime)} - {prettyTime(endTime)}
        </LectureTime>
      </LectureFooter>
    </LectureWrapper>
  )
}

export default Lecture
