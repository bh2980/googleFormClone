import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hook/storeHook";
import useChangeEditBlockID from "../../hook/useChangeEditBlockID";
import { editContent, editTitle } from "../../store/reducer/docsSlice";
import Block from "../common/Block";
import Input from "../common/Input";
import TextArea from "../common/TextArea";
import { changeSidebarPosition } from "../../store/reducer/sideBarPosition";

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
    if (!containerRef?.current || !questionInputRef?.current) return;

    //자동 focus 처리
    if (isEditing) {
      const focusElement = document.activeElement;

      if (!containerRef.current.contains(focusElement)) {
        questionInputRef.current.focus();
      }

      const updateSidebarPosition = () => {
        if (!containerRef.current) return;

        const { top, left, width } = containerRef.current.getBoundingClientRect();

        dispatch(changeSidebarPosition({ top, left: left + width + 20 }));
      };

      updateSidebarPosition();

      window.addEventListener("resize", updateSidebarPosition);

      return () => {
        window.removeEventListener("resize", updateSidebarPosition);
      };
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
