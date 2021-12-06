import React, { useEffect, useRef, useState } from "react"

const DEFAULT_CENTER_MOSCOW = [55.76, 37.64]

type Coordinates = number[]

type MapProps = {
  markers: Coordinates[]
  center: Coordinates
}

const YandexMap = ({ markers: places, center }: MapProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<ymaps.Map>()
  const [ready, setReady] = useState(false)

  // navigator.geolocation.getCurrentPosition(console.log, console.warn)

  useEffect(() => {
    if (!ready) window.ymaps.ready(() => setReady(true))

    return () => mapRef.current && mapRef.current.destroy()
  }, [])

  useEffect(() => {
    if (!ready || !containerRef.current) return

    mapRef.current = new window.ymaps.Map(containerRef.current, {
      center: DEFAULT_CENTER_MOSCOW,
      zoom: 10,
      controls: ["geolocationControl", "zoomControl"]
    }, {})

    const mapId = mapRef.current

    places.forEach(coordinates => {
      mapId.geoObjects.add(new window.ymaps.Placemark(coordinates, {
        // balloonContent: "Location Placeholder"
      }))
    })
  }, [ready])

  useEffect(() => {
    if (!mapRef.current || center.length < 2) return

    mapRef.current
      .panTo(center)
      .then(() => mapRef.current?.setZoom(15))
  }, [center])

  return <div ref={containerRef} style={{ height: "300px" }} ></div>
}

export default YandexMap
