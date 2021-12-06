import {combineReducers, configureStore, Reducer} from "@reduxjs/toolkit"

import {freeSchedule, busySchedule, UserScheduleState} from "./slices/schedule.slice"
import { AuthReducer, AuthState } from "./slices/auth.slice"
import {reducer as uiReducer} from "./slices/ui.slice"
import {putToLs} from "../Shared/utils"
import {STORAGE_KEY} from "../Shared/constants"
import {UiState} from './slices/ui.slice'
import { placesReducer, PlacesState } from "./slices/places.slice"

export interface Root {
  currentEvent: {
    schedule: UserScheduleState
    places: PlacesState
  }
  auth: AuthState
  ui: UiState
}

const rootReducer: Reducer<Root> =
  combineReducers({

    currentEvent: combineReducers({

      schedule: combineReducers({
        whenFree: freeSchedule.reducer,
        whenBusy: busySchedule.reducer
      }),

      places: placesReducer,

    }),
    auth: AuthReducer,
    ui: uiReducer
  })

export const store = configureStore({
  reducer: rootReducer,
})

store.subscribe(() => {
  putToLs(STORAGE_KEY, store.getState().currentEvent.schedule)
})

export default store
