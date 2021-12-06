import React, { ComponentProps } from "react";
import { motion } from "framer-motion";


export const MotionExpand = ({ children, className }: ComponentProps<"div">) => <motion.div
  style={{ overflow: "hidden" }}
  initial={{ height: 0 }}
  animate={{ height: "auto" }}
  exit={{ height: 0 }}
  transition={{ ease: "easeOut", duration: 0.2 }}
  className={className}
> {children} </motion.div>;
