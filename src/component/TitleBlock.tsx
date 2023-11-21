import { useAppDispatch, useAppSelector } from "../hook/storeHook";
import { editContent, editTitle } from "../store/docsSlice";
import Block from "./common/Block";
import Input from "./common/Input";
import TextArea from "./common/TextArea";

const TitleBlock = () => {
  const dispatch = useAppDispatch();
  const { title, content } = useAppSelector((store) => store.docs);

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editTitle(e.target.value));
  };

  const changeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(editContent(e.target.value));
  };

  return (
    <Block className="flex flex-col w-full gap-2 p-6" isTitleBlock>
      <Input className="text-3xl" onChange={changeTitle} value={title} placeholder="제목을 입력하세요" />
      <TextArea value={content} onChange={changeContent} placeholder="설명을 입력하세요" />
    </Block>
  );
};

export default TitleBlock;
