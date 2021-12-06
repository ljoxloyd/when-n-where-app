import React from "react";
import { Switch } from "@headlessui/react";
import { CheckIcon } from "./Icons/CheckIcon";


export const Checkbox = ({
  checked, onChange, label
}: {
  checked: boolean; onChange: (value: boolean) => void; label: string;
}) => <Switch.Group>
    <Switch {...{ checked, onChange }} className={` w-5 h-5
      transition-colors duration-200 ease-out bg-white
      grid place-items-center border-2 rounded
      ${checked ? "border-yellow-500 bg-yellow-300" : ""}`}
    >
      {checked && <CheckIcon size="xs" />}
    </Switch>
    <Switch.Label className="cursor-pointer"> {label} </Switch.Label>
  </Switch.Group>;
