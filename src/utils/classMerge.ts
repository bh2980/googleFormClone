import { clsx } from "clsx";
import { ClassNameValue, twMerge } from "tailwind-merge";

const classMerge = (classes: ClassNameValue[]) => {
  return twMerge(clsx(classes));
};

export default classMerge;
