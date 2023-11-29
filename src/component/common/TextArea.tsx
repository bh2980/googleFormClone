import classMerge from "../../utils/classMerge";
import useFluidTextArea from "../../hook/useFluidTextArea";

interface TextAreaProps extends React.ComponentPropsWithoutRef<"textarea"> {}

const TextArea = ({ className, ...props }: TextAreaProps) => {
  const { textareaRef, handleInput } = useFluidTextArea();

  return (
    <div className="relative w-full">
      <textarea
        className={classMerge(["peer", "w-full", "overflow-hidden", "py-2", "outline-none", "resize-none", className])}
        onInput={handleInput}
        ref={textareaRef}
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

export default TextArea;
