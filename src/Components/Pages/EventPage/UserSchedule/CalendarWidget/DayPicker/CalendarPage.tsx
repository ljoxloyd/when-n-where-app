import React, { ComponentProps } from 'react'

const CalendarPage = (props: ComponentProps<'div'>) => (
  <div {...props} className="grid grid-cols-7 touch-none select-none" />
)

CalendarPage.DisabledTile = (props: { date: string }) => (
  <abbr
    aria-label={props.date}
    className="grid place-items-center h-8 text-gray-400"
  >
    {props.date.substring(8)}
  </abbr>
)

CalendarPage.EmptyTile = () => <div></div>

type ActiveTileProps = ComponentProps<'div'> & {
  date: string
  variant: 'outlined' | 'filled' | 'default'
}

CalendarPage.ActiveTile = ({ date, variant, ...props }: ActiveTileProps) => (
  <abbr
    {...props}
    role="button"
    data-date={date}
    aria-label={date}
    className={`
     grid place-items-center h-8 ${
       {
         default: 'hover:text-yellow-500 border',
         outlined:
           'hover:text-yellow-500 border-t border-b bg-yellow-100 border-yellow-400',
         filled: 'bg-yellow-400 border-yellow-400',
       }[variant]
     }`}
  >
    {date.substring(8)}
  </abbr>
)

export default CalendarPage
