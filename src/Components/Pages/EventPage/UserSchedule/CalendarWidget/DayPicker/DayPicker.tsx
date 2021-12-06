import dayjs from 'dayjs'
import React, { useState } from 'react'
import { ControlledState } from '../../../../../../Shared/types'
import { range } from '../../../../../../Shared/utils'
import Page from './CalendarPage'
export const findDaysOnCalendarPage = (monthShown: dayjs.Dayjs) => {
  const START_DATE = monthShown.startOf('month').startOf('isoWeek')

  const END_DATE = monthShown.endOf('month').endOf('isoWeek')

  const DAYS_TOTAL = 1 + END_DATE.diff(START_DATE, 'days')

  return range(DAYS_TOTAL).map(number =>
    START_DATE.add(number, 'days').format('YYYY-MM-DD')
  )
}

interface DayPickerProps extends ControlledState<string[]> {
  monthShown: dayjs.Dayjs
}

const DayPicker = ({ value, monthShown, onChange: setValue }: DayPickerProps) => {
  const [shouldExpand, setShouldExpand] = useState(false)

  const start = (date: string) => {
    setShouldExpand(true)
    setValue([date, date])
  }

  const expand = (date: string) => setValue(value => [value[0], date])

  const stop = () => setShouldExpand(false)

  const makeTouchHandler = (fn: Function) => (e: React.TouchEvent) => {
    const { clientX, clientY } = e.changedTouches[0]
    const element = document.elementFromPoint(clientX, clientY)
    if (element instanceof HTMLElement) {
      const date = element.dataset.date
      if (date) fn(date)
    }
  }

  const datesOnCalendar = React.useMemo(
    () => findDaysOnCalendarPage(monthShown),
    [monthShown]
  )

  return (
    <Page
      onTouchStart={makeTouchHandler(start)}
      onTouchMove={makeTouchHandler(expand)}
      onTouchEnd={stop}
      onMouseLeave={stop}
    >
      {datesOnCalendar.map(date =>
        !monthShown.isSame(date, 'month') ? (
          <Page.EmptyTile key={date} />
        ) : dayjs().isAfter(date) ? (
          <Page.DisabledTile key={date} date={date} />
        ) : (
          <Page.ActiveTile
            key={date}
            date={date}
            variant={
              dayjs(date).isBetween(value[0], value[1])
                ? 'outlined'
                : date === value[0] || date === value[1]
                ? 'filled'
                : 'default'
            }
            onMouseDown={() => start(date)}
            onMouseUp={stop}
            onMouseOver={() => shouldExpand && expand(date)}
          />
        )
      )}
    </Page>
  )
}

export default DayPicker
