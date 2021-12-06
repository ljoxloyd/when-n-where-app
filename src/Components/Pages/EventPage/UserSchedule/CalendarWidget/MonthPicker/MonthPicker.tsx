import React from 'react'
import dayjs from 'dayjs'

import { ControlledState } from '../../../../../../Shared/types'
import { range, wrapJSX } from '../../../../../../Shared/utils'
import { IconButton } from '../../../../../Views/IconButton'
import { ChevronDoubleLeft } from '../../../../../Views/Icons/ChevronDoubleLeft'
import { ChevronDoubleRight } from '../../../../../Views/Icons/ChevronDoubleRight'
import { ChevronLeft } from '../../../../../Views/Icons/ChevronLeft'
import { ChevronRight } from '../../../../../Views/Icons/ChevronRight'

const Container = wrapJSX(<div className=" flex justify-evenly items-center" />)

const MonthSelect = ({ value, onChange }: ControlledState<dayjs.Dayjs>) => {
  //prettier-ignore
  return (
    <Container>
      <IconButton
        aria-label="previous year"
        onClick={() => onChange(value.subtract(1, "year"))}
        icon={<ChevronDoubleLeft/>}/>
      <IconButton
        aria-label="previous month"
        onClick={() => onChange(value.subtract(1, "month"))}
        icon={<ChevronLeft/>}/>

      <select
        value={value.year()}
        onChange={e => onChange(value.year(+e.target.value))}
      >
        {
          range(-5, 5)
            .map(num => value.year() + num)
            .map(year => <option key={year} value={year}> {year} </option>)
        }
      </select>
      <select
        value={value.month()}
        onChange={e => onChange(value.month(+e.target.value))}
      >
        {
          dayjs.monthsShort()
            .map((month, index) => <option key={month} value={index}> {month} </option>)
        }
      </select>

      <IconButton
        aria-label="next month"
        onClick={() => onChange(value.add(1, "month"))}
        icon={<ChevronRight/>}/>
      <IconButton
        aria-label="next year"
        onClick={() => onChange(value.add(1, "year"))}
        icon={<ChevronDoubleRight/>}/>

    </Container>
  )
}

export default MonthSelect
