import React, {ComponentProps} from "react"
import {SIZES} from "../../Shared/constants"

type SvgIcon = (props: ComponentProps<"svg"> & { size?: keyof typeof SIZES }) => JSX.Element
type JSXWrapper<T> = (jsx: JSX.Element) => T

export const createIcon: JSXWrapper<SvgIcon> = svg => props =>
  React.cloneElement(svg, {...props, className: `${props.className ?? "inline"} ${SIZES[props.size ?? "sm"]}`})

