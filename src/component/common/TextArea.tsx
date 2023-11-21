import classMerge from "../../utils/classMerge";

interface TextAreaProps extends React.ComponentPropsWithoutRef<"textarea"> {}

const TextArea = ({ className, ...props }: TextAreaProps) => {
  //ref를 활용하는 방법도 존재
  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;

    target.style.height = "inherit";
    target.style.height = `${target.scrollHeight}px`;
  };

  return (
    <textarea
      className={classMerge([
        "overflow-hidden py-2 outline-none resize-none focus:border-b-2 focus:border-violet-500",
        className,
      ])}
      rows={1}
      onInput={handleInput}
      {...props}
    />
  );
};

export default TextArea;
