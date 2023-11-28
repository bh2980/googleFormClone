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

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editTitle(e.target.value));
  };

  const changeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(editContent(e.target.value));
  };

  return (
    <Block className="flex flex-col w-full gap-2 p-6" onClick={changeEditingBlockID} isTitleBlock isEditing={isEditing}>
      <Input className="text-3xl" onChange={changeTitle} defaultValue={title} placeholder="제목을 입력하세요" />
      <TextArea defaultValue={content} onChange={changeContent} placeholder="설명을 입력하세요" />
    </Block>
  );
};

export default TitleBlock;
