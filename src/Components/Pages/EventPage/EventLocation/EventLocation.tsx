import React, { useState } from "react"
import YandexMap from "./YandexMap/YandexMap"
import { LocationOption } from "./LocationOption/LocationOption"
import "./places-styles.css"
import { useSelector } from "react-redux"
import Select from "../../../../Store/selectors"
import { withDevFallback } from "../../../HOCs"


const EventLocation = () => {

  const places = useSelector(Select.places)
  const coordinates = places.map(p => p.coordinates)

  const [center, setCenter] = useState<number[]>([])

  return (
    <section className="section w-full">

      <YandexMap markers={coordinates} center={center} />

      <div className="flex flex-col gap-2 py-2">
        {places.map(place =>
          <LocationOption key={place.id} place={place} onShow={setCenter} />
        )}
      </div>

    </section>
  )
}

export default withDevFallback(EventLocation)
