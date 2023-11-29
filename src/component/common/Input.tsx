import classMerge from "../../utils/classMerge";

interface InputProps extends React.ComponentPropsWithRef<"input"> {
  innerRef?: React.ComponentPropsWithRef<"input">["ref"];
}

const Input = ({ className, innerRef, ...props }: InputProps) => {
  return (
    <div className={classMerge(["relative", className])}>
      <input
        ref={innerRef}
        className={classMerge(["py-4", "peer", "outline-none", "w-full", "bg-transparent"])}
        {...props}
      />
      <div
        className={classMerge([
          "after:absolute",
          "after:bottom-0",
          "after:w-[0px]",
          "after:h-[2px]",
          "after:left-1/2",
          "after:bg-violet-500",
          "after:transition-all",
          "after:ease-in-out",
          "after:duration-300",
          "peer-focus:after:w-full",
          "peer-focus:after:left-0",
        ])}
      />
    </div>
  );
};

export default Input;
