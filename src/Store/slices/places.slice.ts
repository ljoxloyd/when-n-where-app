import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit"
import { Table } from "../../Shared/utils"
import { ReduxTable } from "../../Shared/types"


export interface Place {
  address: string,        id: string
  description: string,    picked: boolean
  coordinates: number[],  name: string
}

const newPlace = (
  name: string, address: string, coordinates: number[], description: string
): Place => ({
  id: nanoid(), name, address, coordinates, description, picked: false
})

export type PlacesState = ReduxTable<Place>

//hardcoded state. later will be retrived from server
const initialState = Table<Place>()
  .add(newPlace(
    "Bar",
    "Трубная ул., 23 стр. 2, Москва",
    [55.734347, 37.644052],
    `Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов.`
  ))
  .add(newPlace(
    "Climbing Gym",
    "ул. Лужники, 24 строение 10, Москва",
    [55.7203046, 37.5546499],
    `Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов.`,
  ))
  .add(newPlace(
    "Park",
    "Москва, Петровский Парк",
    [55.7944153, 37.5536264],
    "Велобайк (московский велопрокат)",
  ))
  .unwrap()

type IdValuePayload = PayloadAction<{ id: string,  value: boolean  }>

export const { reducer: placesReducer, actions: placesActions } = createSlice({
  name: "places",
  initialState,
  reducers: {
    SET_PICKED(state, { payload }: IdValuePayload) {
      state.byId[payload.id].picked = payload.value
    },
  }
})