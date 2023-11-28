import { useEffect, useRef } from "react";
import classMerge from "../../utils/classMerge";

interface TextAreaProps extends React.ComponentPropsWithoutRef<"textarea"> {}

const TextArea = ({ className, ...props }: TextAreaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  //ref를 활용하는 방법도 존재
  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;

    target.style.height = "inherit"; // 높이 감소 시 필요
    //스크롤의 길이만큼 실시간으로 높이를 늘려서 스크롤을 없앰
    target.style.height = `${target.scrollHeight}px`;
  };

  useEffect(() => {
    // 시작 시 높이 지정
    if (!textareaRef?.current) return;

    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, []);

  return (
    <div className="relative w-full">
      <textarea
        className={classMerge(["peer", "w-full", "overflow-hidden", "py-2", "outline-none", "resize-none", className])}
        rows={1}
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
