interface RadioProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
}

export const Radio = ({ label, ...props }: RadioProps) => {
  return (
    <label className="flex items-center gap-4 group/radio hover:cursor-pointer">
      <input type="radio" className="hidden peer" {...props} />
      <div className="border-2 border-gray-600 relative flex justify-center items-center w-[20px] h-[20px] rounded-full before:absolute before:flex before:items-center before:w-[10px] before:h-[10px] before:rounded-full peer-checked:before:bg-violet-500 group-hover/radio:after:w-[40px] group-hover/radio:after:h-[40px] group-hover/radio:after:absolute group-hover/radio:after:bg-violet-300/50 group-hover/radio:after:rounded-full peer-disabled:after:hidden peer-disabled:opacity-50" />
      {label && <span>{label}</span>}
    </label>
  );
};

export default Radio;
