import React, { Fragment } from "react";
import { Transition } from "@headlessui/react";


export const TransitionDropDown = ({ children, show }: any) => <Transition
  as={Fragment}
  show={show}
  enter="transition duration-150 ease-in origin-top"
  enterFrom="transform scale-y-0 opacity-0"
  enterTo="transform scale-y-100 opacity-100"
  leave="transition duration-150 ease-in origin-top"
  leaveFrom="transform scale-y-100 opacity-100"
  leaveTo="transform scale-y-0 opacity-0"
>
  {children}
</Transition>;
