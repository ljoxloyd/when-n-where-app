import React, { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { DATE_FORMAT } from '../../../../../Shared/constants'
import { wrapJSX } from '../../../../../Shared/utils'
import CalendarWidget from '../CalendarWidget/CalendarWidget'
import { withDevFallback } from '../../../../HOCs'
import { PlusIcon } from '../../../../Views/Icons/PlusIcon'

const TEXT = {
  Add: 'Add',
  Clear: 'Clear',
  QuickAdd: 'Quick add',
  PickDateFirst: 'Pick a date first',
}

const Chip = wrapJSX<'button'>(
  <button className="mx-1 mt-2 pl-4 py-1 pr-6 btn flex items-end rounded-full bg-yellow-400" />
)

const GridContainer = wrapJSX(
  <div className="grid items-start p-2 user-schedule__grid-template shadow-md bg-white " />
)

const Flex = wrapJSX(<div className="flex" />)

const CustomFlex = wrapJSX(<Flex className="flex-col user-schedule__separator" />)

const FlexWrap = wrapJSX(<Flex className="flex-wrap" />)

interface MenuProps {
  onSelect: (date: string[]) => void
}

const MenuDayPicker = ({ onSelect }: MenuProps) => {
  const prompts = useMemo(() => {
    const now = dayjs()
    const nextWeek = now.add(1, 'week')

    type D = dayjs.Dayjs

    const toStrDate = (d: D) => d.format(DATE_FORMAT)
    const getWeekend = (week: D) => [week.isoWeekday(6), week.isoWeekday(7)]

    return {
      Tomorrow: [toStrDate(now.add(1, 'day'))],
      'This weekend': getWeekend(now).map(toStrDate),
      'Next weekend': getWeekend(nextWeek).map(toStrDate),
      'Full next week': [nextWeek.isoWeekday(1), nextWeek.isoWeekday(7)].map(toStrDate),
    }
  }, [])

  const [dates, setDates] = useState(['', ''])
  const resetDates = () => setDates(['', ''])

  const renderPromptsPanel = (
    <FlexWrap>
      <h3 className="font-bold w-full m-2 text-lg">{TEXT.QuickAdd}</h3>
      {Object.entries(prompts).map(([text, dates]) => (
        <Chip key={text} onClick={() => onSelect(dates)}>
          <PlusIcon className="mr-2" /> {text}
        </Chip>
      ))}
    </FlexWrap>
  )

  const noSelection = !dates[0]

  const renderButtons = (
    <Flex>
      <Chip
        disabled={noSelection}
        title={noSelection ? TEXT.PickDateFirst : ''}
        onClick={() => {
          resetDates()
          onSelect(dates)
        }}
      >
        {TEXT.Add}
      </Chip>
      <Chip
        disabled={noSelection}
        title={!dates[0] ? TEXT.PickDateFirst : ''}
        onClick={() => setDates(['', ''])}
      >
        {TEXT.Clear}
      </Chip>
    </Flex>
  )

  return (
    <GridContainer>
      {renderPromptsPanel}

      <CustomFlex>
        <CalendarWidget value={dates} onChange={setDates} />

        {renderButtons}
      </CustomFlex>
    </GridContainer>
  )
}

export default withDevFallback(MenuDayPicker)
