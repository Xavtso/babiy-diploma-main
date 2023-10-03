import React, { useCallback, useState } from 'react'
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md'
import dayjs from 'dayjs'
import Card, { Title } from 'components/Card'
import useUser from 'utils/useUser'
import useSchedule from 'utils/useSchedule'
import Spinner from 'components/Spinner'
import { Header, Navigation, NavigationButton, Week } from './styles'
import Day from './Day'

const Schedule: React.FC = () => {
  const [date, setDate] = useState(dayjs())

  const week = date.diff(date.startOf('year'), 'week')
  const year = date.year()

  const getPrevWeek = useCallback(() => setDate((prev) => prev.subtract(1, 'week')), [])
  const getNextWeek = useCallback(() => setDate((prev) => prev.add(1, 'week')), [])

  const { user } = useUser()
  const { schedule, isValidating } = useSchedule({ code: user?.group?.code, week, year })

  return (
    <Card>
      <Header>
        <Title>Розклад</Title>

        <Navigation>
          <NavigationButton type="button" onClick={getPrevWeek}>
            <MdOutlineChevronLeft />
          </NavigationButton>
          <NavigationButton type="button" onClick={getNextWeek}>
            <MdOutlineChevronRight />
          </NavigationButton>
        </Navigation>
      </Header>

      {!schedule && isValidating ? (
        <Spinner />
      ) : (
        <Week>
          {schedule?.map?.((day) => (
            <li key={day.date}>
              <Day day={day} />
            </li>
          ))}
        </Week>
      )}
    </Card>
  )
}

export default Schedule
