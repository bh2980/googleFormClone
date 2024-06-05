import { classMerge } from '../utils/classMerge';

interface DividerProps {
  className?: string;
  direction?: 'horizontal' | 'vertical';
}

export const Divider = ({
  className,
  direction = 'horizontal',
}: DividerProps) => {
  return (
    <div
      className={classMerge([
        direction === 'horizontal' ? 'w-full' : 'h-full',
        'border-[1px]',
        className,
      ])}
    />
  );
};

export default Divider;
