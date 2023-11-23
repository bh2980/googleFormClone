interface CheckboxProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
}

const Checkbox = ({ label, ...props }: CheckboxProps) => {
  return (
    <label className="flex items-center gap-4">
      <input type="checkbox" className="hidden peer" {...props} />
      <div className="w-[20px] h-[20px] rounded-lg border-2 border-gray-500 peer-checked:bg-violet-500" />
      <span>{label}</span>
    </label>
  );
};

export default Checkbox;
