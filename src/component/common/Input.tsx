import classMerge from "../../utils/classMerge";

interface InputProps extends React.ComponentPropsWithRef<"input"> {
  innerRef?: React.ComponentPropsWithRef<"input">["ref"];
}

const Input = ({ className, innerRef, ...props }: InputProps) => {
  return (
    <input
      ref={innerRef}
      className={classMerge(["py-2", "focus:border-b-2", "outline-none", "focus:border-violet-500", className])}
      {...props}
    />
  );
};

export default Input;
