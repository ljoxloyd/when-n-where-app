import React, { useEffect, useMemo, useRef } from "react"
import { toast, ToastOptions } from "react-toastify"


/**
 * @param mediaQuery must be without parentheses e.g. "max-width: 640px"
 * @return flag set to true if query is matched
 * */
export const useMediaQuery = (mediaQuery: string) => {

  const [isMatches, setIsMatches] = React.useState(window.matchMedia(mediaQuery).matches)

  React.useEffect(() => {
    const mediaQueryList = window.matchMedia(`(${mediaQuery})`)
    const updateIsMatches = () => setIsMatches(mediaQueryList.matches)

    mediaQueryList.onchange = updateIsMatches

    updateIsMatches()
    return () => {
      mediaQueryList.onchange = null
    }
  }, [mediaQuery]
  )
  return isMatches
}

/**
 *  FIXME: improve or remove
 */
export const useFocus = <T extends HTMLElement>(deps?: React.DependencyList) => {
  const ref = useRef<T>(null)
  useEffect(() => {
    if (ref.current) ref.current.focus()
  }, deps ?? [])
  return ref
}


/**
 * Makes single alert popup with react-toastify, that changes with the alert message.
 * Relies on a ToastContainer to be present
 */
export const useToastAlert = (message: string | null, options: ToastOptions) => {
  useEffect(() => {
    if (message) {
      const id = toast(message, { type: "dark", ...options })

      return () => toast.dismiss(id)
    }
  }, [message])
}