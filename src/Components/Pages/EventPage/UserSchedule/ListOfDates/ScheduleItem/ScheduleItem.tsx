import React, { ComponentProps, useMemo } from "react"
import dayjs from "dayjs"

import { IScheduleItem, ScheduleActions } from "../../../../../../Store/slices/schedule.slice"
import { actions as UiActions } from "../../../../../../Store/slices/ui.slice"
import { useFocus, useToastAlert } from "../../../../../../Shared/hooks"
import { CtrlInput } from "../../../../../../Shared/types"
import { useDispatch } from "react-redux"
import { MotionSlideIn } from "../../../../../Views/Animations/MotionSlideIn"
import { IconButton } from "../../../../../Views/IconButton"
import { PenIcon } from "../../../../../Views/Icons/PenIcon"
import { TrashIcon } from "../../../../../Views/Icons/TrashIcon"


const EMPTY_FIELD_ALERT = "Empty fields will fallback to their default value"
const WRONG_ORDER_ALERT = "Picked time is in a wrong order. Click here to swap"


type TimeViewProps =
  { label: string, asInput: boolean, className?: string }
  & Required<CtrlInput>

const TimeView = React.forwardRef<HTMLInputElement, TimeViewProps>((
  { className = "inline-block bg-yellow-200 rounded px-2 w-min", ...props },
  ref
) => props.asInput
    ? <label>{props.label}<input ref={ref} type="time" {...{ className, ...props }} /></label>
    : <span>{props.label} <b> {props.value} </b></span>
)

interface ScheduleItemProps {
  item: IScheduleItem
  index: number
  isInEdit: boolean
  actions: ScheduleActions
}

const ScheduleItem = ({
  item: { id, dates, time: [timeFrom, timeTo] },
  index,
  isInEdit,
  actions
}: ScheduleItemProps) => {

  const dispatch = useDispatch()

  const normalize = () => dispatch(actions.FIX_TIME(index))
  const setStart = (val: string) => dispatch(actions.SET_START_TIME([val, index]))
  const setStop = (val: string) => dispatch(actions.SET_STOP_TIME([val, index]))

  // const [isTouched, setTouched] = useState(false)

  const alert = useMemo(() => {
    // if (isTouched) {
    if (!timeFrom || !timeTo) return EMPTY_FIELD_ALERT
    if (timeFrom > timeTo) return WRONG_ORDER_ALERT
    // }
    return null
  }, [timeFrom, timeTo,
    // isTouched
  ])

  //When component exits edit mode it swaps fields if
  //order is wrong and returns them to default if empty
  if (!isInEdit && alert) normalize()

  useToastAlert(alert, { onClick: normalize })

  const inputRef = useFocus<HTMLInputElement>([isInEdit])

  return (
    <MotionSlideIn className={`${isInEdit
      ? "hover:border-yellow-200 border-gray-100 transition-colors" : ""}
      border-2 border-white flex items-center px-2`} >

      <div className="flex gap-2 flex-wrap">
        <b> {formatDates(dates)} </b>

        <TimeView ref={inputRef} asInput={isInEdit} label="from: " value={timeFrom} onChange={e => {
          setStart(e.target.value)
          // setTouched(true)
        }} />
        <TimeView asInput={isInEdit} label="to: " value={timeTo} onChange={e => {
          setStop(e.target.value)
          // setTouched(true)
        }} />

      </div>

      <IconButton
        className="ml-auto"
        onClick={isInEdit
          ? () => dispatch(actions.DELETE_DATE(id))
          : () => dispatch(UiActions.setIdInEdit(id))
        }
        icon={isInEdit ? <TrashIcon /> : <PenIcon />}
      />
    </MotionSlideIn>)
}

export default ScheduleItem

//This is temporary obvious solution for representing group of dates
//in a compact, readable way
//TODO: should format more than two dates that representing range
function formatDates(days: string[]): string {
  if (days.length === 1) {
    return dayjs(days[0]).format("DD MMMM")
  }

  const first = dayjs(days[0])
  const last = dayjs(days[1])
  let f, l

  l = first.isSame(dayjs(), "year") ? "DD MMM" : "DD MMM, YYYY"

  if (first.isSame(last, "date")) {
    f = "DD MMMM";
    l = " "

  } else if (first.isSame(last, "month")) {
    f = "DD - "

  } else if (first.isSame(last, "year")) {
    f = "DD MMMM - "

  } else {
    f = "DD MMMM, YYYY - "
  }
  return first.format(f) + last.format(l)
}
