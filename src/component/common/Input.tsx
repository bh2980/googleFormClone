import classMerge from "../../utils/classMerge";

interface InputProps extends React.ComponentPropsWithRef<"input"> {}

const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={classMerge([
        "py-2",
        "border-b-[2px]",
        "border-white",
        "focus:border-b-[2px] focus:border-violet-500",
        className,
      ])}
      {...props}
    />
  );
};

export default Input;
