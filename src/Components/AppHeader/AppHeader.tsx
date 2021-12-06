import React from "react"
import { Link, NavLink } from "react-router-dom"

import { useMediaQuery } from "../../Shared/hooks"
import { wrapJSX } from "../../Shared/utils"
import { Popover } from "@headlessui/react"
import { ROUTE_MAIN } from "../../Shared/constants"
import { MenuIcon } from "../Views/Icons/MenuIcon"
import { TransitionDropDown } from "../Views/Animations/TransitionDropDown"

const Header = wrapJSX(
  <header className="h-16 bg-yellow-500 shadow-lg mx-auto mb-10 sticky top-0 z-50" />
)
const FlexContainer = wrapJSX(
  <div className="container flex items-center h-full" />
)
const NavBar = wrapJSX(
  <nav className="ml-auto flex items-center h-full" />
)

const AppHeader =() => {

  const isTablet = useMediaQuery("max-width: 768px")

  //TODO: improve styles
  const linkClassName  = `nav-elem btn ${isTablet ? "bg-yellow-400 m-2": ""}`

  const renderLinkHome = (
    <NavLink
      key="home"
      to="/"
      className={linkClassName}
      children="Home" />
  )

  const renderLinkAllEvents = (
    <NavLink
      key="event"
      to={ROUTE_MAIN}
      className={linkClassName}
      children="Login" />
  )

  return (
    <Header>
      <FlexContainer>
        <h1 className="lg:text-4xl text-3xl text-gray-700 select-none">
          <Link className="cursor-pointer ml-4" to="/">When & Where</Link></h1>
        <NavBar>

          {isTablet || renderLinkHome}

          {isTablet || renderLinkAllEvents}

          {!isTablet || (
            <Popover className="relative">
              <Popover.Button className="nav-elem btn">
                <MenuIcon />
                <span className="font-bold ml-2">Menu</span>
              </Popover.Button>

              {/*<Popover.Overlay className="opacity-30 bg-black fixed inset-0" />*/}
              <TransitionDropDown>
                <Popover.Panel className="absolute w-max right-4 top-16 bg-white  rounded shadow-xl">
                  {renderLinkHome}
                  {renderLinkAllEvents}
                </Popover.Panel>
              </TransitionDropDown>
            </Popover>
          )}


        </NavBar>
      </FlexContainer>
    </Header>
  )
}

export default AppHeader
