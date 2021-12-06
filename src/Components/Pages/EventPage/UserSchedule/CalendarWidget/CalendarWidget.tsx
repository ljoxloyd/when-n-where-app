import React, { useState } from 'react'
import dayjs from 'dayjs'

import MonthPicker from './MonthPicker/MonthPicker'
import DayPicker from './DayPicker/DayPicker'
import { ControlledState } from '../../../../../Shared/types'
import { WeekDaysPanel } from './WeekDaysPanel'
import { withDevFallback } from '../../../../HOCs'

const CalendarWidget = (props: ControlledState<string[]>) => {
  const [monthShown, setMonthShown] = useState(dayjs())

  return (
    <>
      <MonthPicker value={monthShown} onChange={setMonthShown} />
      <WeekDaysPanel />
      <DayPicker monthShown={monthShown} value={props.value} onChange={props.onChange} />
    </>
  )
}

export default withDevFallback(CalendarWidget)
