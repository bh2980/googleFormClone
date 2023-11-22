import { useAppDispatch, useAppSelector } from "../hook/storeHook";
import useChangeEditBlockID from "../hook/useChangeEditBlockID";
import { editContent, editTitle } from "../store/docsSlice";
import Block from "./common/Block";
import Input from "./common/Input";
import TextArea from "./common/TextArea";

interface TitleBlockProps {
  isEditing?: boolean;
}

const TitleBlock = ({ isEditing }: TitleBlockProps) => {
  const dispatch = useAppDispatch();
  const { title, content } = useAppSelector((store) => store.docs);
  const { changeEditBlockID } = useChangeEditBlockID();

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editTitle(e.target.value));
  };

  const changeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(editContent(e.target.value));
  };

  return (
    <Block
      className="flex flex-col w-full gap-2 p-6"
      onClick={() => changeEditBlockID("title")}
      isTitleBlock
      isEditing={isEditing}
    >
      <Input className="text-3xl" onChange={changeTitle} value={title} placeholder="제목을 입력하세요" />
      <TextArea value={content} onChange={changeContent} placeholder="설명을 입력하세요" />
    </Block>
  );
};

export default TitleBlock;
