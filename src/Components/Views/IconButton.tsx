import React, { ComponentProps } from "react";


export const IconButton: React.FC<ComponentProps<"button"> & { icon: JSX.Element; }> = ({ icon, className, ...props }) => <button
  className={`rounded-full grid place-items-center h-10 w-10 btn hover:bg-gray-100 hover:text-yellow-400 ${className ?? ""}`}
  {...props}
>{icon}</button>;
