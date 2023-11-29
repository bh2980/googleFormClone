import { useEffect, useRef } from "react";

const useFluidTextArea = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "inherit"; // 높이 감소 시 필요
    //스크롤의 길이만큼 실시간으로 높이를 늘려서 스크롤을 없앰
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  useEffect(() => {
    // 시작 시 높이 지정
    if (!textareaRef?.current) return;

    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    textareaRef.current.rows = 1;
  }, []);

  return { textareaRef, handleInput };
};

export default useFluidTextArea;
