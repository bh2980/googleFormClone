import classMerge from "../../utils/classMerge";

interface InputProps extends React.ComponentPropsWithRef<"input"> {}

const Input = ({ className, ...props }: InputProps) => {
  return <input className={classMerge(["focus:border-b-2 border-violet-800 py-2", className])} {...props} />;
};

export default Input;
