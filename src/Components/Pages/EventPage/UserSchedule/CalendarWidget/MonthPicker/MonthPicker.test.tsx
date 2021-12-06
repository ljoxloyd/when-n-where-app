import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import MonthSelect from './MonthPicker'
import { Setter } from '../../../../../../Shared/types'

beforeAll(() => {
  dayjs.extend(localeData)
})

afterEach(cleanup)

describe('MonthPicker', () => {
  let testDate = dayjs('2021-04-04')
  let setTestDate: Setter<dayjs.Dayjs> = val => (testDate = val as dayjs.Dayjs)

  const ariaLabels = ['previous year', 'previous month', 'next month', 'next year']

  const getIconButtons = () =>
    ariaLabels.map(label => document.querySelector(`button[aria-label="${label}"]`))

  it('should have aria labeled buttons', () => {
    render(<MonthSelect value={testDate} onChange={setTestDate} />)

    getIconButtons().forEach(btn => {
      expect(btn).toBeTruthy()
    })
  })

  test('is year changes', () => {
    render(<MonthSelect value={testDate} onChange={setTestDate} />)

    const [prevYearBtn, , , nextYearBtn] = getIconButtons()

    if (!prevYearBtn || !nextYearBtn) throw 'Year buttons not found'

    fireEvent.click(prevYearBtn)
    expect(testDate.year()).toBe(2020)

    fireEvent.click(nextYearBtn)
    expect(testDate.year()).toBe(2022)
  })

  test('is month changes', () => {
    render(<MonthSelect value={testDate} onChange={setTestDate} />)

    const [, prevMonthBtn, nextMonthBtn] = getIconButtons()

    if (!prevMonthBtn || !nextMonthBtn) throw 'Month buttons not found'

    fireEvent.click(prevMonthBtn)
    expect(testDate.month()).toBe(2)

    fireEvent.click(nextMonthBtn)
    expect(testDate.month()).toBe(4)
  })
})
