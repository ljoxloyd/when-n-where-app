import React, { ComponentProps } from "react";
import { motion } from "framer-motion";


export const MotionSlideIn = ({ children, className }: ComponentProps<"div">) => <motion.div
  initial={{ opacity: 0, x: -50, height: 0 }}
  exit={{ opacity: 0, x: 50, height: 0 }}
  animate={{ opacity: 1, x: 0, height: "auto" }}
  transition={{ ease: "easeIn" }}
  className={className}
> {children} </motion.div>;
