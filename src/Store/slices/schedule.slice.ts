import { createSlice, CreateSliceOptions, Middleware, nanoid, PayloadAction } from "@reduxjs/toolkit"

import { getStateFromLS } from "../../Shared/utils"
import { STORAGE_KEY, DEFAULTS } from "../../Shared/constants"
import { array, object, string, Infer } from "superstruct"


const ScheduleItemSchema = object({
  dates: array(string()),
  time: array(string()),
  id: string()
})

const ScheduleStateSchema = object({
  whenFree: array(ScheduleItemSchema),
  whenBusy: array(ScheduleItemSchema)
})

export type UserScheduleState = Infer<typeof ScheduleStateSchema>

export type IScheduleItem = Infer<typeof ScheduleItemSchema>


type DateIndex = PayloadAction<number>
type TimeAndIndex = PayloadAction<[string, number]>
type DateValue = PayloadAction<string[]>


const newDateRange = (firstDay: string, lastDay: string): IScheduleItem => ({
  dates: [firstDay, lastDay],
  time: [DEFAULTS.START_TIME, DEFAULTS.STOP_TIME],
  id: nanoid()
})

type GenericOptions = Pick<CreateSliceOptions<IScheduleItem[]>, "name" | "initialState">
const createScheduleSlice = (options: GenericOptions) => createSlice({
  ...options,
  reducers: {
    ADD_DATE(state, { payload }: DateValue) {
      //make sure payload represents date-range (has 2 dates in it)
      payload[1] = payload[1] || payload[0]
      //and make sure dates are in order
      payload = payload.sort()
      state.push(newDateRange(payload[0], payload[1]))
    },
    FIX_TIME(state, { payload }: DateIndex) {
      const item = state[payload]
      const [start, stop] = item.time

      if (!start)
        item.time[0] = DEFAULTS.START_TIME

      if (!stop)
        item.time[1] = DEFAULTS.STOP_TIME

      if (start && stop && start > stop)
        item.time = [stop, start]
    },
    DELETE_DATE(state, { payload }: PayloadAction<string>) {
      state.splice(
        state.findIndex(date => date.id === payload), 1
      )
    },
    SET_START_TIME(state, { payload }: TimeAndIndex) {
      state[payload[1]].time[0] = payload[0]
    },
    SET_STOP_TIME(state, { payload }: TimeAndIndex) {
      state[payload[1]].time[1] = payload[0]
    },
  }
})

const initialState = getStateFromLS({
  key: STORAGE_KEY,
  schema: ScheduleStateSchema,
  fallback: {
    whenFree: [],
    whenBusy: []
  }
})

export const freeSchedule = createScheduleSlice({
  name: "schedule/whenFree",
  initialState: initialState.whenFree
})

export const busySchedule = createScheduleSlice({
  name: "schedule/whenBusy",
  initialState: initialState.whenBusy
})

export type ScheduleActions = typeof freeSchedule.actions | typeof busySchedule.actions
