import classMerge from "../../utils/classMerge";

interface InputProps extends React.ComponentPropsWithRef<"input"> {
  innerRef?: React.ComponentPropsWithRef<"input">["ref"];
}

const Input = ({ className, innerRef, ...props }: InputProps) => {
  return (
    <input
      ref={innerRef}
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
