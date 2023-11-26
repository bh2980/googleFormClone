import { useAppSelector } from "../../hook/storeHook";
import Block from "../common/Block";
import TextArea from "../common/TextArea";

const TitleBlock = () => {
  const { title, content } = useAppSelector((store) => store.docs);

  return (
    <Block className="flex flex-col w-full gap-2 p-6" isTitleBlock>
      <span className="text-3xl">{title}</span>
      <TextArea disabled>{content}</TextArea>
    </Block>
  );
};

export default TitleBlock;
