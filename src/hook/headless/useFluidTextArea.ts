import { useLayoutEffect, useRef } from "react";

const useFluidTextArea = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "inherit"; // 높이 감소 시 필요
    //스크롤의 길이만큼 실시간으로 높이를 늘려서 스크롤을 없앰
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  // 최초 paint 전에 rows와 height 지정
  useLayoutEffect(() => {
    if (!textareaRef?.current) return;

    textareaRef.current.rows = 1;
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, []);

  return { textareaRef, handleInput };
};

export default useFluidTextArea;
