import React from 'react'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import isBetween from 'dayjs/plugin/isBetween'
import localeData from 'dayjs/plugin/localeData'
import DayPicker from './DayPicker'
import { findDaysOnCalendarPage } from './DayPicker'
import { cleanup, render, createEvent } from '@testing-library/react'
import { range } from '../../../../../../Shared/utils'

dayjs.extend(isoWeek)
dayjs.extend(isBetween)
dayjs.extend(localeData)

const now = dayjs()

const setup = (testDate: dayjs.Dayjs) => {
  const onChangeSpy = jest.fn()
  const TestEnvironment = () => {
    const [state, setState] = React.useState(['', ''])

    return (
      <DayPicker
        value={state}
        onChange={val => {
          onChangeSpy(val)
          setState(val)
        }}
        monthShown={testDate}
      />
    )
  }

  return { onChangeSpy, ...render(<TestEnvironment />) }
}

afterEach(cleanup)

describe('DayPicker', () => {
  const monthSpec = range(12).map(monthNumber => [
    now.month(monthNumber).format('MMMM'),
    now.month(monthNumber).daysInMonth(),
    monthNumber,
  ])

  test.each(monthSpec)('%s should have %i days', (_, amountOfDays, monthNumber) => {
    const { container } = setup(now.month(monthNumber as number))

    const abbrButtons = container.querySelectorAll('abbr[aria-label]')

    expect(abbrButtons.length).toBe(amountOfDays)
  })

  // test('click and hold mouse select', () => {
  //   setup(dayjs('2021-11-01'))

  //   document.querySelector('abbr[aria-label="2021-11-04"]')
  // })
})

describe('findDaysOnCalendarPage', () => {
  test('amount of dates on each page should be divisible by 7 to fill the grid', () => {
    range(12).forEach(monthNumber => {
      const totalDays = findDaysOnCalendarPage(now.month(monthNumber))

      expect(totalDays.length % 7 === 0).toBeTruthy()
    })
  })
})
