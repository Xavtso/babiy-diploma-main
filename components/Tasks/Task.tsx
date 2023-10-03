import dayjs from 'dayjs'
import React from 'react'
import ITask from 'types/task'
import { Item, TaskDate, TaskContent, TaskTitle, TaskDescription } from './styles'

interface TaskProps {
  task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
  if (!task) return null
  const { title, deadline, description } = task
  return (
    <Item>
      <TaskDate>{dayjs(deadline).format('DD/MM')}</TaskDate>
      <TaskContent>
        <TaskTitle>{title}</TaskTitle>
        <TaskDescription>{task?.class?.discipline?.title || description}</TaskDescription>
      </TaskContent>
    </Item>
  )
}

export default Task
