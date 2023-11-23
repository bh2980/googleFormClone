interface CheckboxProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
}

const Checkbox = ({ label, ...props }: CheckboxProps) => {
  return (
    <label className="flex items-center gap-4 group">
      <input type="checkbox" className="hidden peer" {...props} />
      <div className="relative flex justify-center items-center w-[20px] h-[20px] rounded-lg border-2 border-gray-600 peer-checked:bg-violet-500 group-hover:before:absolute group-hover:before:w-[40px] group-hover:before:h-[40px] group-hover:before:bg-violet-300/50 group-hover:before:rounded-xl peer-disabled:before:hidden peer-disabled:opacity-50" />
      {label && <span>{label}</span>}
    </label>
  );
};

export default Checkbox;
