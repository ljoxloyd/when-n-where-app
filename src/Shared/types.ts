import React, { ComponentProps } from "react"

export type Setter<T> = React.Dispatch<React.SetStateAction<T>>

export interface ControlledState<T> {
  value: T
  onChange: Setter<T>
}

export type CtrlInput = Pick<ComponentProps<"input">,
  "value" | "onChange"
>

export interface ReduxTable<I> {
  byId: Record<string, I>
  allIds: string[]
}

export interface AuthData {
  email: string
  password: string
}
