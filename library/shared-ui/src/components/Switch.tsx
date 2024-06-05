import { classMerge } from '../utils/classMerge';

interface SwitchProps extends React.ComponentPropsWithRef<'input'> {
  description?: string;
  descriptionPos?: 'before' | 'after';
}

export const Switch = ({
  description,
  descriptionPos = 'after',
  ...props
}: SwitchProps) => {
  return (
    <label className="flex gap-4" tabIndex={0}>
      {descriptionPos === 'before' && (
        <span className="cursor-pointer">{description}</span>
      )}
      <div className="relative flex items-center cursor-pointer w-[48px] h-[24px]">
        <input className="hidden peer" type="checkbox" {...props} />
        <div className="absolute h-[20px] w-[48px] bg-gray-300 peer-checked:bg-violet-100 rounded-full"></div>
        <span
          className={classMerge([
            'absolute',
            'h-[24px]',
            'w-[24px]',
            'bg-gray-100',
            'shadow-md',
            'rounded-full',
            'hover:ring-8',
            'transition-all',
            'duration-300',
            'hover:ring-gray-300/50',
            'peer-checked:bg-violet-500',
            'peer-checked:translate-x-[100%]',
            'peer-checked:hover:ring-violet-400/50',
          ])}
        />
      </div>
      {descriptionPos === 'after' && (
        <span className="cursor-pointer">{description}</span>
      )}
    </label>
  );
};

export default Switch;
