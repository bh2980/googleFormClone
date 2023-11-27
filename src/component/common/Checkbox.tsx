interface CheckboxProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
}

// TODO CheckBoxGroup 만들기
const Checkbox = ({ label, ...props }: CheckboxProps) => {
  return (
    <label className="flex items-center gap-4 group/checkbox hover:cursor-pointer">
      <input type="checkbox" className="hidden peer" {...props} />
      <div className="relative flex justify-center items-center w-[20px] h-[20px] rounded-md border-2 border-gray-600 peer-checked:bg-violet-500 group-hover/checkbox:before:absolute group-hover/checkbox:before:w-[40px] group-hover/checkbox:before:h-[40px] group-hover/checkbox:before:bg-violet-300/50 group-hover/checkbox:before:rounded-xl peer-disabled:before:hidden peer-disabled:opacity-50" />
      {label && <span>{label}</span>}
    </label>
  );
};

export default Checkbox;
