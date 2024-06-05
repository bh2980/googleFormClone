import { clsx } from 'clsx';
import { ClassNameValue, twMerge } from 'tailwind-merge';

export const classMerge = (classes: ClassNameValue[]) => {
  return twMerge(clsx(classes));
};
