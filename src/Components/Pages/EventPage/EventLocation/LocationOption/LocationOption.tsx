import React, { Fragment, useCallback, useState } from "react"
import { Switch, Disclosure } from "@headlessui/react"
import { AnimatePresence } from "framer-motion"
import { useMediaQuery } from "../../../../../Shared/hooks"
import { Place } from "../../../../../Store/slices/places.slice"
import { placesActions as Act } from "../../../../../Store/slices/places.slice"
import { useDispatch } from "react-redux"
import { CheckIcon } from "../../../../Views/Icons/CheckIcon"
import { MotionExpand } from "../../../../Views/Animations/MotionExpand"
import { ChevronLeft } from "../../../../Views/Icons/ChevronLeft"

//Decided to split jsx to see if maintaining it easier this way
export const LocationOption = ({
  place, onShow
}: {
  place: Place,
  onShow: (c: Place["coordinates"]) => void
}) => {

  const dispatch = useDispatch()

  const isPicked = place.picked
  const setPicked = (value: boolean) =>
    dispatch(Act.SET_PICKED({ id: place.id, value }))

  const showOnMap = () => onShow([...place.coordinates])

  const isMobile = useMediaQuery("max-width: 480px")

  return (
    <Disclosure as="div" className="border-2 border-gray-200  mx-2">
      {({ open }) => {

        const renderCheckbox = (
          <Switch.Group>
            <Switch checked={isPicked} onChange={setPicked} className={`
              w-5 h-5 mx-2 active:border-yellow-400
              transition-colors duration-200 ease-out bg-white
              grid place-items-center border-2 rounded
              ${isPicked ? "border-yellow-500 bg-yellow-300" : ""}
            `}>
              {isPicked && <CheckIcon className="check_animation absolute" />}
            </Switch>
            <Switch.Label className="cursor-pointer"> {place.name} </Switch.Label>
          </Switch.Group>
        )

        const renderDetails = (
          <Disclosure.Panel static as={Fragment}>
            <AnimatePresence presenceAffectsLayout>
              {open && (
                <MotionExpand className="pr-2 pl-9 pb-2 fade-in">
                  <b> {"Address"} </b>
                  <span> {place.address} </span>
                  <button onClick={showOnMap} className="hover:text-yellow-500 " >
                    <b> {"Show on map"}</b>
                  </button>
                  <p> {place.description} </p>
                </MotionExpand>
              )}
            </AnimatePresence>
          </Disclosure.Panel>
        )

        const renderButton = (
          <Disclosure.Button className="py-2 mx-4 flex items-end ml-auto font-bold hover:text-yellow-500 ">
            <ChevronLeft className={`
              transform transition-transform duration-300
              ${open ? "-rotate-90 " : "rotate-0"}
              `} />
            {!isMobile && "Details"}
          </Disclosure.Button>
        )

        return <>
          <div className="flex flex-wrap items-center">
            {renderCheckbox}
            {renderButton}
          </div>
          {renderDetails}
        </>
      }}
    </Disclosure>
  )
}
