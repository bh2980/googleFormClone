import classMerge from "../../utils/classMerge";

interface IconButtonProps extends React.ComponentPropsWithRef<"button"> {}

const IconButton = ({ children, className, type = "button", ...props }: IconButtonProps) => {
  return (
    <button
      className={classMerge(["p-3", "rounded-full", "hover:bg-gray-200", "active:bg-gray-300", className])}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;
