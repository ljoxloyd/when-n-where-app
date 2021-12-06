import { User } from "../../models"
import { createSlice } from "@reduxjs/toolkit"
import { makeSetterFor } from "../../Shared/utils"


export interface AuthState {
  user: User | null
}

const initialState: AuthState = {
  user: null
}

const setter = makeSetterFor<AuthState>()

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: setter("user")
  }
})

export const AuthReducer = AuthSlice.reducer
export const AuthActions = AuthSlice.actions
