import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hook/storeHook";
import useChangeEditBlockID from "../../hook/useChangeEditBlockID";
import { editContent, editTitle } from "../../store/reducer/docsSlice";
import Block from "../common/Block";
import Input from "../common/Input";
import TextArea from "../common/TextArea";

const TitleBlock = () => {
  const dispatch = useAppDispatch();
  const { title, content } = useAppSelector((store) => store.docs);
  const { changeEditingBlockID, isEditing } = useChangeEditBlockID("title");

  const containerRef = useRef<HTMLElement>(null);
  const questionInputRef = useRef<HTMLInputElement>(null);

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editTitle(e.target.value));
  };

  const changeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(editContent(e.target.value));
  };

  useEffect(() => {
    //자동 focus 처리
    if (!containerRef?.current || !questionInputRef?.current) return;

    if (isEditing) {
      const focusElement = document.activeElement;

      if (!containerRef.current.contains(focusElement)) {
        questionInputRef.current.focus();
      }
    }
  }, [isEditing]);

  return (
    <Block
      className="flex flex-col w-full gap-2 p-6"
      onClick={changeEditingBlockID}
      isTitleBlock
      isEditing={isEditing}
      innerRef={containerRef}
    >
      <Input
        className="text-3xl"
        onChange={changeTitle}
        defaultValue={title}
        placeholder="제목을 입력하세요"
        innerRef={questionInputRef}
      />
      <TextArea defaultValue={content} onChange={changeContent} placeholder="설명을 입력하세요" />
    </Block>
  );
};

export default TitleBlock;
