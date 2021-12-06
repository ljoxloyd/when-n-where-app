import { createSlice } from "@reduxjs/toolkit"
import { makeSetterFor } from "../../Shared/utils"



export interface UiState {
  idInEdit: string | null
  menuIsInFree: boolean
}

const initialState: UiState = {
  idInEdit: null,
  menuIsInFree: true
}

const setField = makeSetterFor<UiState>()

export const { reducer, actions } = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setMenuIsInFree: setField("menuIsInFree")
    ,
    setIdInEdit: setField("idInEdit")
  }
})